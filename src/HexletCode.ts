import renderForm from "./render.js";
import type { Attributes, FormControl } from "./types.js";

export type FormOptions = {
  method?: string;
  url?: string;
};

export type FormTemplate = Record<string, unknown>;

export type InputOptions = Attributes & {
  as?: "textarea";
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
    const { as, ...attributes } = options;

    this.controls = [
      ...this.controls,
      { attributes: { ...attributes }, name, type: as ?? "input", value },
    ];
  }

  submit(value = "Save"): void {
    this.controls = [...this.controls, { type: "submit", value }];
  }
}
