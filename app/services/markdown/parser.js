
import frontmatter from 'remark-frontmatter'
import unified from 'unified'
import parse from 'remark-parse'

export class MarkdownParser {
  static parse(contents) {
    const parser = unified().use(parse).use(frontmatter, ['yaml'])
    const ast = parser.parse(contents)
    return ast
  }
}
