import Tag from "./Tag.js";
import type { FieldControl, FormControl, FormRepresentation } from "./types.js";

const capitalize = (value: string): string => `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

const renderField = (control: FieldControl): string => {
  const label = new Tag("label", { for: control.name }, capitalize(control.name));
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

  return new Tag("form", { action: form.action, method: form.method }, body).toString();
};

export default renderForm;
