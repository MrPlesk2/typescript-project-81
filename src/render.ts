import Tag from "./Tag.js";
import type { FieldControl, FormControl, FormRepresentation } from "./types.js";

const renderField = (control: FieldControl): string => {
  const label = new Tag("label", { for: control.name, ...control.labelAttributes }, control.label);
  const field =
    control.type === "textarea"
      ? new Tag(
          "textarea",
          { cols: 20, rows: 40, name: control.name, ...control.attributes },
          control.value,
        )
      : new Tag("input", {
          name: control.name,
          type: "text",
          value: control.value,
          ...control.attributes,
        });

  return `${label}${field}`;
};

const renderControl = (control: FormControl): string => {
  if (control.type === "submit") {
    return new Tag("input", { type: "submit", value: control.value }).toString();
  }

  return renderField(control);
};

const renderForm = (form: FormRepresentation): string => {
  const body = form.controls.map(renderControl).join("");

  return new Tag("form", { method: form.method, action: form.action }, body).toString();
};

export default renderForm;
