import { parseHtml } from './html-parser';

describe('parseHtml', () => {
  describe('single child', () => {
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
        `<button class="some-class" type="button" disabled>text</button>`,
      );
      expect(result).toEqual([
        {
          nodeType: 'tag',
          tagName: 'button',
          attrs: [
            {
              name: 'class',
              value: 'some-class',
            },
            {
              name: 'type',
              value: 'button',
            },
            {
              name: 'disabled',
              value: '',
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
});
