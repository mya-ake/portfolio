import faker from 'faker';
import { createDate } from './shared/date';
import type { Post } from './types';

const createBody = () => `
<p>${faker.lorem.lines(1)}</p>
<p>${faker.lorem.lines(3)}</p>

<p><em>${faker.lorem.lines(1)}</em></p>
<p><strong>${faker.lorem.lines(1)}</strong></p>
<p><u>${faker.lorem.lines(1)}</u></p>
<p><s>${faker.lorem.lines(1)}</s></p>
<p><code>${faker.lorem.lines(1)}</code></p>

<p><a href=\\"https://example.com\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://example.com</a></p>

<blockquote>${faker.lorem.lines(1)}</blockquote>
<blockquote>${faker.lorem.lines(3)}</blockquote>

<pre><code>const print = (): string =&gt; &#x27;test content&#x27;</code></pre>

<ul>
  <li>${faker.lorem.sentence(1)}</li>
  <li>${faker.lorem.sentence(2)}</li>
  <li>${faker.lorem.sentence(3)}</li>
  <li>
  ${faker.lorem.word(1)}
    <ul>
      <li>
      ${faker.lorem.word(2)}
      <ul>
        <li>${faker.lorem.word(3)}</li>
      </li>
    </ul>
  </li>
</ul>

<ol>
  <li>${faker.lorem.sentence(1)}</li>
  <li>${faker.lorem.sentence(2)}</li>
  <li>${faker.lorem.sentence(3)}</li>
</ol>

<p><img src=\\"${faker.image.imageUrl()}\\" alt></p>
`;

export const createPost = (): Post => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.lines(1),
    body: createBody(),
    publishedAt: createDate(),
    revisedAt: createDate(),
  };
};