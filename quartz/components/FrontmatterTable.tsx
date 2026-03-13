import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function formatValue(value: unknown): string {
  if (value === null) return "null"
  if (value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

const FrontmatterTable: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const fm = fileData.frontmatter
  if (!fm) return null

  const hidden = new Set(["created", "modified", "published", "title"])

  const entries = Object.entries(fm)
    .filter(([k, v]) => {
      if (hidden.has(k)) return false
      return v !== undefined && v !== null && String(v).trim() !== ""
    })
    .sort(([a], [b]) => a.localeCompare(b))

  if (entries.length === 0) return null

  return (
    <details class={classNames(displayClass, "frontmatter")}>
      <summary>
        <span class="frontmatter-title">Properties</span>
        <span class="frontmatter-count">{entries.length}</span>
      </summary>
      <div class="frontmatter-grid">
        {entries.map(([k, v]) => (
          <>
            <div class="frontmatter-key">{k}</div>
            <div class="frontmatter-value">{formatValue(v)}</div>
          </>
        ))}
      </div>
    </details>
  )
}

FrontmatterTable.css = `
.frontmatter {
  margin: 0.75rem 0 1rem 0;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  background: var(--highlight);
}

.frontmatter > summary {
  cursor: pointer;
  user-select: none;
  color: var(--darkgray);
  font-weight: 650;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.frontmatter-title {
  letter-spacing: 0.01em;
}

.frontmatter-count {
  font-size: 0.8rem;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--lightgray);
  background: var(--light);
  color: var(--darkgray);
}

.frontmatter-grid {
  margin-top: 0.6rem;
  display: grid;
  grid-template-columns: 12rem 1fr;
  column-gap: 0.75rem;
  row-gap: 0.35rem;
  padding: 0.6rem;
  border-radius: 8px;
  background: var(--light);
}

.frontmatter-key {
  color: var(--darkgray);
  font-weight: 600;
  overflow-wrap: anywhere;
}

.frontmatter-value {
  white-space: pre-wrap;
  word-break: break-word;
}
`

export default (() => FrontmatterTable) satisfies QuartzComponentConstructor
