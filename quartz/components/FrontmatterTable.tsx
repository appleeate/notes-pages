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
      <summary>Properties</summary>
      <table>
        <tbody>
          {entries.map(([k, v]) => (
            <tr>
              <th>{k}</th>
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
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background: var(--light);
}

.frontmatter > summary {
  cursor: pointer;
  user-select: none;
  color: var(--darkgray);
  font-weight: 600;
}

.frontmatter table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

.frontmatter th {
  text-align: left;
  width: 12rem;
  padding: 0.25rem 0.5rem 0.25rem 0;
  color: var(--darkgray);
  font-weight: 600;
  vertical-align: top;
}

.frontmatter td {
  padding: 0.25rem 0;
  white-space: pre-wrap;
  word-break: break-word;
}
`

export default (() => FrontmatterTable) satisfies QuartzComponentConstructor
