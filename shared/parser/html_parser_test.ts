import { assertEquals } from "std/testing/asserts.ts";
import { assertSnapshot } from "std/testing/snapshot.ts";
import { parseHtml } from "./html_parser.ts";

/**
 * Single root HTML
 */
Deno.test({
  name: "parse html without attrs",
  fn() {
    const result = parseHtml(`<p>text</p>`);
    assertEquals(result, [
      {
        nodeType: "tag",
        tagName: "p",
        attrs: {},
        childNodes: [
          {
            nodeType: "text",
            content: "text",
          },
        ],
      },
    ]);
  },
});

Deno.test({
  name: "parse html with attrs",
  fn() {
    const result = parseHtml(
      `<button type="button" disabled aria-pressed="false">text</button>`
    );
    assertEquals(result, [
      {
        nodeType: "tag",
        tagName: "button",
        attrs: {
          type: "button",
          disabled: "",
          "aria-pressed": "false",
        },
        childNodes: [
          {
            nodeType: "text",
            content: "text",
          },
        ],
      },
    ]);
  },
});

/**
 * Multi root HTML
 */
Deno.test({
  name: "parse multi rool html",
  fn() {
    const result = parseHtml(
      `<p class="p p1">text 1</p><p class="p">text 2</p>`
    );
    assertEquals(result, [
      {
        nodeType: "tag",
        tagName: "p",
        attrs: {
          class: "p p1",
        },
        childNodes: [
          {
            nodeType: "text",
            content: "text 1",
          },
        ],
      },
      {
        nodeType: "tag",
        tagName: "p",
        attrs: {
          class: "p",
        },
        childNodes: [
          {
            nodeType: "text",
            content: "text 2",
          },
        ],
      },
    ]);
  },
});

/**
 * deep children
 */
Deno.test({
  name: "parse list",
  async fn(t) {
    const result = parseHtml(`<ul><li>item 1</li><li>item 1</li></ul>`);
    await assertSnapshot(t, result);
  },
});

Deno.test({
  name: "parse some content",
  async fn(t) {
    const result = parseHtml(`<div>no wrapped<p>item 1</p><img src="/static/sample.png" alt=""/></div>`);
    await assertSnapshot(t, result);
  },
});

/**
 * web components
 */
 Deno.test({
  name: "parse some content",
  async fn(t) {
    const result = parseHtml(`<custom-p>text</custom-p>`);
    await assertSnapshot(t, result);
  },
});
