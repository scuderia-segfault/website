import * as prettier from 'prettier';

/** Escapes text for use in HTML content and attribute values. */
export const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const flatten = (value) => {
  if (value === null || value === undefined || value === false) return '';
  if (Array.isArray(value)) return value.map(flatten).join('');
  return String(value);
};

/**
 * Tagged template for HTML snippets, so templates can be written as indented,
 * multi-line markup without changing the rendered page.
 *
 * Whitespace in the template text that contains a line break is treated like JSX does:
 * it is removed next to a tag or an interpolation and becomes a single space between
 * two pieces of text. Spaces on a single line are kept as written, so to keep a visible
 * space between text and a link, keep both on the same line. Interpolated values
 * are inserted unchanged (escape text with `esc`); arrays are joined, and
 * `null`, `undefined` and `false` render nothing.
 */
export function html(strings, ...values) {
  let out = '';
  strings.forEach((part, i) => {
    out += part.replace(/[ \t]*\r?\n\s*/g, (match, offset) => {
      const before = part[offset - 1];
      const after = part[offset + match.length];
      if (before === undefined || after === undefined || before === '>' || after === '<') return '';
      return ' ';
    });
    if (i < values.length) out += flatten(values[i]);
  });
  return out;
}

/** Pretty-prints a complete HTML document with Prettier's HTML parser. */
export async function formatHtml(source, filepath) {
  const config = (await prettier.resolveConfig(filepath)) ?? {};
  return prettier.format(source, { ...config, filepath, parser: 'html' });
}

/**
 * Renders `render()` only if `condition` is truthy, otherwise `orElse()` (default: nothing).
 * Written as a function so that the template is not evaluated when the data is missing.
 */
export const when = (condition, render, orElse = () => '') => (condition ? render() : orElse());
