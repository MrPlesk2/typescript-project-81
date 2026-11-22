import renderForm from "./render.js";
import type { AttributeValue, Attributes, FormControl } from "./types.js";

export type FormOptions = {
  method?: string;
  url?: string;
};

export type FormTemplate = Record<string, unknown>;

export type InputOptions = {
  [name: string]: unknown;
  as?: "textarea";
  label?: string;
  labelHtml?: Attributes;
};

const capitalize = (value: string): string => `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

const isAttributeEntry = (entry: [string, unknown]): entry is [string, AttributeValue] => {
  const valueType = typeof entry[1];

  return valueType === "string" || valueType === "number";
};

export default class HexletCode {
  private readonly template: Readonly<FormTemplate>;

  private controls: readonly FormControl[] = [];

  private constructor(template: FormTemplate) {
    this.template = { ...template };
  }

  static formFor(
    template: FormTemplate,
    options: FormOptions,
    callback: (form: HexletCode) => void,
  ): string {
    const form = new HexletCode(template);
    callback(form);

    return renderForm({
      action: options.url ?? "#",
      controls: form.controls,
      method: options.method ?? "post",
    });
  }

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const value = String(this.template[name]);
    const { as, label = capitalize(name), labelHtml = {}, ...htmlAttributes } = options;
    const attributes = Object.fromEntries(Object.entries(htmlAttributes).filter(isAttributeEntry));

    this.controls = [
      ...this.controls,
      {
        attributes,
        label,
        labelAttributes: { ...labelHtml },
        name,
        type: as ?? "input",
        value,
      },
    ];
  }

  submit(value = "Save"): void {
    this.controls = [...this.controls, { type: "submit", value }];
  }
}
