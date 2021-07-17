import { findTargetTagNode, hasTargetTagNode } from './utils';
import type { Node } from './html-parser';

describe('findTargetTagNode', () => {
  const nodes: Node[] = [
    { nodeType: 'tag', tagName: 'button', childNodes: [], attrs: {} },
  ];

  it('has', () => {
    const node = findTargetTagNode('button', nodes);
    expect(node).not.toBeUndefined();
  });

  it('not has', () => {
    const node = findTargetTagNode('a', nodes);
    expect(node).toBeUndefined();
  });
});

describe('hasTargetTagNode', () => {
  const nodes: Node[] = [
    { nodeType: 'tag', tagName: 'button', childNodes: [], attrs: {} },
  ];

  it('has', () => {
    const has = hasTargetTagNode('button', nodes);
    expect(has).toBe(true);
  });

  it('not has', () => {
    const has = hasTargetTagNode('a', nodes);
    expect(has).toBe(false);
  });
});
