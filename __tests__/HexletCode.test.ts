import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import HexletCode from "@hexlet/code";

const template = { gender: "m", job: "hexlet", name: "rob" };
const getFixture = (name: string): string =>
  readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), "utf8").trim();

describe("HexletCode.formFor", () => {
  it("generates an empty form with default attributes", () => {
    const form = HexletCode.formFor(template, {}, () => {});

    expect(form).toBe('<form method="post" action="#"></form>');
  });

  it("uses the provided URL as the form action", () => {
    const form = HexletCode.formFor(template, { url: "/users" }, () => {});

    expect(form).toBe('<form method="post" action="/users"></form>');
  });

  it("uses the provided form method", () => {
    const form = HexletCode.formFor(template, { method: "get" }, () => {});

    expect(form).toBe('<form method="get" action="#"></form>');
  });

  it("generates input and textarea fields", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
    });

    expect(form).toBe(getFixture("form-with-fields.html"));
  });

  it("adds custom attributes to fields", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", { class: "user-input" });
      f.input("job");
    });

    expect(form).toBe(getFixture("form-with-attributes.html"));
  });

  it("overrides default textarea attributes", () => {
    const form = HexletCode.formFor(template, { url: "#" }, (f) => {
      f.input("job", { as: "textarea", cols: 50, rows: 50 });
    });

    expect(form).toBe(getFixture("form-with-textarea-overrides.html"));
  });

  it("adds labels and a submit button with the default value", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit();
    });

    expect(form).toBe(getFixture("form-with-submit.html"));
  });

  it("uses custom text for the submit button", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name");
      f.submit("Wow");
    });

    expect(form).toBe(getFixture("form-with-custom-submit.html"));
  });

  it("uses custom label text and attributes", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", {
        label: "User",
        labelHtml: { class: "form-label", id: "name-label" },
      });
      f.submit("Ok");
    });

    expect(form).toBe(getFixture("form-with-custom-label.html"));
  });

  it("throws when the field does not exist in the template", () => {
    expect(() =>
      HexletCode.formFor(template, { url: "/users" }, (f) => {
        f.input("age");
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });
});
