import faker from 'faker';
import { createDate } from './shared/date';
import type { Post } from './types';

const createBody = () => `
<h1>${faker.lorem.lines(1)}</h1>
<h2>${faker.lorem.lines(1)}</h2>
<h3>${faker.lorem.lines(1)}</h3>
<h4>${faker.lorem.lines(1)}</h4>
<h5>${faker.lorem.lines(1)}</h5>
<h6>${faker.lorem.lines(1)}</h6>

<p>${faker.lorem.lines(1)}</p>
<p>${faker.lorem.lines(3)}</p>

<p><em>${faker.lorem.lines(1)}</em></p>
<p><strong>${faker.lorem.lines(1)}</strong></p>
<p><u>${faker.lorem.lines(1)}</u></p>
<p><s>${faker.lorem.lines(1)}</s></p>
<p><code>${faker.lorem.lines(1)}</code></p>

<p><a href=\\"https://example.com\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://example.com</a></p>

<blockquote>${faker.lorem.lines(1)}</blockquote>
<br/>
<blockquote>${faker.lorem.lines(3)}</blockquote>

<hr/>

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
      </ul>
    </ul>
  </li>
</ul>

<ol>
  <li>${faker.lorem.sentence(1)}</li>
  <li>${faker.lorem.sentence(2)}</li>
  <li>${faker.lorem.sentence(3)}</li>
</ol>

<img src=\\"${faker.image.imageUrl()}\\" alt="content:480:300">
`;

export const createPost = (): Post => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.lines(3),
    body: createBody(),
    publishedAt: createDate(),
    revisedAt: createDate(),
  };
};
