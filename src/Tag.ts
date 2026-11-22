import type { Attributes } from "./types.js";

const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export default class Tag {
  private readonly name: string;

  private readonly attributes: Attributes;

  private readonly body: string;

  constructor(name: string, attributes: Attributes, body = "") {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
  }

  toString(): string {
    const attributes = Object.entries(this.attributes)
      .map(([name, value]) => `${name}="${String(value)}"`)
      .map((attribute) => ` ${attribute}`);
    const openingTag = [`<${this.name}`, ...attributes, ">"].join("");

    if (voidTags.has(this.name.toLowerCase())) {
      return openingTag;
    }

    return `${openingTag}${this.body}</${this.name}>`;
  }
}
