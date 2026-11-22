export type AttributeValue = string | number;

export type Attributes = Record<string, AttributeValue>;

export type FieldControl = Readonly<{
  attributes: Readonly<Attributes>;
  label: string;
  labelAttributes: Readonly<Attributes>;
  name: string;
  type: "input" | "textarea";
  value: string;
}>;

export type SubmitControl = Readonly<{
  type: "submit";
  value: string;
}>;

export type FormControl = FieldControl | SubmitControl;

export type FormRepresentation = Readonly<{
  action: string;
  controls: readonly FormControl[];
  method: string;
}>;
