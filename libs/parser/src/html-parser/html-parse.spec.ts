import { describe, it, expect } from 'vitest';
import { parseHtml } from './html-parser';

describe('parseHtml', () => {
  describe('single root', () => {
    it('no attrs', () => {
      const result = parseHtml(`<p>text</p>`);
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'p',
          attrs: {},
          childNodes: [
            {
              nodeType: 'text',
              content: 'text',
            },
          ],
        },
      ]);
    });

    it('has attrs', () => {
      const result = parseHtml(
        `<button type="button" disabled aria-pressed="false">text</button>`,
      );
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'button',
          attrs: {
            type: 'button',
            disabled: '',
            'aria-pressed': 'false',
          },
          childNodes: [
            {
              nodeType: 'text',
              content: 'text',
            },
          ],
        },
      ]);
    });
  });

  describe('multi root', () => {
    it('', () => {
      const result = parseHtml(
        `<p class="p p1">text 1</p><p class="p">text 2</p>`,
      );
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'p',
          attrs: {
            class: 'p p1',
          },
          childNodes: [
            {
              nodeType: 'text',
              content: 'text 1',
            },
          ],
        },
        {
          nodeType: 'tag',
          tagName: 'p',
          attrs: {
            class: 'p',
          },
          childNodes: [
            {
              nodeType: 'text',
              content: 'text 2',
            },
          ],
        },
      ]);
    });
  });

  describe('deep children', () => {
    it('list', () => {
      const result = parseHtml(`<ul><li>item 1</li><li>item 1</li></ul>`);
      expect(result).toMatchSnapshot();
    });

    it('some content', () => {
      const result = parseHtml(
        `<div>no wrapped<p>item 1</p><img src="/static/sample.png" alt=""/></div>`,
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('web components', () => {
    it('list', () => {
      const result = parseHtml(`<custom-p>text</custom-p>`);
      expect(result).toMatchSnapshot();
    });
  });

  describe(`include '\\'`, () => {
    it(`with '"'`, () => {
      const result = parseHtml(
        `<a href=\\"https://example.com\\" rel=\\"noopener noreferrer\\">https://example.com</a>`,
      );
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'a',
          attrs: {
            href: 'https://example.com',
            rel: 'noopener noreferrer',
          },
          childNodes: [
            {
              nodeType: 'text',
              content: 'https://example.com',
            },
          ],
        },
      ]);
    });

    it(`with '"' and has '\\' text`, () => {
      const result = parseHtml(
        `<a href=\\"https://example.com\\" rel=\\"noopener noreferrer\\">\\</a>`,
      );
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'a',
          attrs: {
            href: 'https://example.com',
            rel: 'noopener noreferrer',
          },
          childNodes: [
            {
              nodeType: 'text',
              content: '\\',
            },
          ],
        },
      ]);
    });
  });
});
