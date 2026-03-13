import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { intro, outro, text, confirm, isCancel, cancel } from "@clack/prompts"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contentDir = path.join(repoRoot, "content")
const publishRcPath = path.join(repoRoot, ".publishrc.json")

const DEFAULT_EXCLUDES = [
  ".obsidian/**",
  ".git/**",
  ".stversions/**",
  ".stignore",
  "Templates/**",
  "scripts/**",
  "private/**",
  "**/.DS_Store",
  "**/Thumbs.db",
  "**/*账号密码*",
]

function die(message) {
  console.error(message)
  process.exit(1)
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    cwd: repoRoot,
    stdio: "inherit",
    ...opts,
  })
  if (res.status !== 0) {
    process.exit(res.status ?? 1)
  }
}

function runCapture(cmd, args) {
  const res = spawnSync(cmd, args, {
    cwd: repoRoot,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  })
  return {
    status: res.status ?? 1,
    stdout: (res.stdout ?? "").toString(),
    stderr: (res.stderr ?? "").toString(),
  }
}

function parseArg(name) {
  const idx = process.argv.indexOf(name)
  if (idx === -1) return undefined
  return process.argv[idx + 1]
}

async function loadPublishRc() {
  try {
    const raw = await fs.readFile(publishRcPath, "utf-8")
    const data = JSON.parse(raw)
    return typeof data === "object" && data ? data : {}
  } catch {
    return {}
  }
}

async function savePublishRc(next) {
  try {
    await fs.writeFile(publishRcPath, JSON.stringify(next, null, 2) + "\n")
  } catch {
    // ignore
  }
}

async function existsDir(p) {
  try {
    const st = await fs.stat(p)
    return st.isDirectory()
  } catch {
    return false
  }
}

function toPosix(p) {
  return p.split(path.sep).join("/")
}

function shouldExclude(relPosix, excludes) {
  // simple glob-like matching for our small set of patterns
  // patterns are like "dir/**" or "**/file"
  for (const pat of excludes) {
    const p = pat
      .replaceAll(".", "\\.")
      .replaceAll("**/", "(?:.*\\/)?")
      .replaceAll("/**", "(?:\\/.*)?")
      .replaceAll("*", "[^/]*")
    const re = new RegExp(`^${p}$`)
    if (re.test(relPosix)) return true
  }
  return false
}

async function listFilesRecursive(root) {
  const out = []
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const ent of entries) {
      const full = path.join(dir, ent.name)
      if (ent.isDirectory()) {
        await walk(full)
      } else if (ent.isFile()) {
        out.push(full)
      }
    }
  }
  await walk(root)
  return out
}

async function ensureEmptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true })
  await fs.mkdir(dir, { recursive: true })
}

async function ensureHomePage(homeTarget) {
  const indexPath = path.join(contentDir, "index.md")
  try {
    await fs.access(indexPath)
    return
  } catch {
    // create if missing
  }

  const body = `---\ntitle: 工作台\n---\n\n[[${homeTarget}]]\n`
  await fs.writeFile(indexPath, body, "utf-8")
}

async function copyNotesToContent(notesDir, excludes, homeTarget) {
  await ensureEmptyDir(contentDir)

  const allFiles = await listFilesRecursive(notesDir)
  for (const abs of allFiles) {
    const rel = path.relative(notesDir, abs)
    const relPosix = toPosix(rel)
    if (shouldExclude(relPosix, excludes)) continue

    const dest = path.join(contentDir, rel)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(abs, dest)
  }

  await ensureHomePage(homeTarget)
}

function isGitRepo() {
  const res = runCapture("git", ["rev-parse", "--is-inside-work-tree"])
  return res.status === 0 && res.stdout.trim() === "true"
}

async function main() {
  intro("Quartz publish")

  if (!(await existsDir(repoRoot))) die(`Repo not found: ${repoRoot}`)
  if (!isGitRepo()) die(`Not a git repository: ${repoRoot}`)

  const rc = await loadPublishRc()
  const argNotes = parseArg("--notes")
  const lastNotesDir = typeof rc.lastNotesDir === "string" ? rc.lastNotesDir : undefined
  const homeTarget = typeof rc.homeTarget === "string" ? rc.homeTarget : "0_Inbox/00工作台"

  const notesDirInput =
    argNotes ??
    (await text({
      message: "笔记目录路径（Obsidian vault 路径）?",
      placeholder: "例如：/Users/dong/Desktop/dong/notes 或 C:\\Users\\dong\\notes",
      defaultValue: lastNotesDir,
      validate: (v) => {
        if (!v || v.trim() === "") return "请输入目录路径"
      },
    }))

  if (isCancel(notesDirInput)) {
    cancel("Cancelled")
    process.exit(0)
  }

  const notesDir = path.resolve(String(notesDirInput))
  if (!(await existsDir(notesDir))) {
    outro(`目录不存在：${notesDir}`)
    process.exit(1)
  }

  await savePublishRc({ ...rc, lastNotesDir: notesDir, homeTarget })

  const confirmed = await confirm({
    message: `将从这个目录同步到 content/ 并推送部署：\n${notesDir}`,
    initialValue: true,
  })

  if (isCancel(confirmed) || !confirmed) {
    cancel("Cancelled")
    process.exit(0)
  }

  await copyNotesToContent(notesDir, DEFAULT_EXCLUDES, homeTarget)

  run("git", ["add", "-A"])

  const diff = runCapture("git", ["diff", "--cached", "--name-only"])
  if (diff.status !== 0) die(diff.stderr || "git diff failed")

  if (diff.stdout.trim() === "") {
    outro("没有检测到变更，无需发布")
    process.exit(0)
  }

  const msg = `Publish notes (${new Date().toISOString().slice(0, 19).replace("T", " ")})`
  run("git", ["commit", "-m", msg])
  run("git", ["push"])

  outro("已推送到 GitHub，Cloudflare Pages 将自动部署")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
