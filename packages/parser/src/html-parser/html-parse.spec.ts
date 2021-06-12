import { parseHtml } from './html-parser';

describe('parseHtml', () => {
  describe('single root', () => {
    it('no attrs', () => {
      const result = parseHtml(`<p>text</p>`);
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'p',
          attrs: [],
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
          attrs: [
            {
              name: 'type',
              value: 'button',
            },
            {
              name: 'disabled',
              value: '',
            },
            {
              name: 'aria-pressed',
              value: 'false',
            },
          ],
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
          attrs: [
            {
              name: 'class',
              value: 'p p1',
            },
          ],
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
          attrs: [
            {
              name: 'class',
              value: 'p',
            },
          ],
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
});
