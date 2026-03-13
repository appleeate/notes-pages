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

  const entries = Object.entries(fm)
    .filter(([_, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .sort(([a], [b]) => a.localeCompare(b))

  if (entries.length === 0) return null

  return (
    <details class={classNames(displayClass, "frontmatter")}>
      <summary>
        <span class="frontmatter-title">Properties</span>
        <span class="frontmatter-count">{entries.length}</span>
      </summary>
      <table>
        <tbody>
          {entries.map(([k, v]) => (
            <tr>
              <th>
                <span class="frontmatter-key">{k}</span>
              </th>
              <td>{formatValue(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

.frontmatter table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 0.6rem;
  overflow: hidden;
  border-radius: 8px;
}

.frontmatter tr:nth-child(odd) {
  background: var(--light);
}

.frontmatter tr:nth-child(even) {
  background: color-mix(in srgb, var(--light) 70%, transparent);
}

.frontmatter th,
.frontmatter td {
  padding: 0.45rem 0.6rem;
  border-top: 1px solid var(--lightgray);
  vertical-align: top;
}

.frontmatter tr:first-child th,
.frontmatter tr:first-child td {
  border-top: none;
}

.frontmatter th {
  width: 12rem;
  color: var(--darkgray);
  font-weight: 600;
}

.frontmatter-key {
  font-family: var(--code-font);
  font-size: 0.9rem;
}

.frontmatter td {
  white-space: pre-wrap;
  word-break: break-word;
}
`

export default (() => FrontmatterTable) satisfies QuartzComponentConstructor
