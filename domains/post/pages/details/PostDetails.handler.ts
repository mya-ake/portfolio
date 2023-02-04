import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { isFetchError } from "@shared/fetch/error.ts";
import type { Handlers } from "$fresh/server.ts";
import type { Post } from "@shared/micro_cms/type.ts";

const responseJson = {
  "id": "vfz7zskhn",
  "createdAt": "2021-05-10T15:16:21.582Z",
  "updatedAt": "2023-01-24T13:37:02.298Z",
  "publishedAt": "2021-05-10T15:16:21.582Z",
  "revisedAt": "2023-01-24T13:37:02.298Z",
  "title": "test 1",
  "description": "テスト用のコンテンツ",
  "body":
    '<h1 id="hf19cd910e2">Heading 1</h1><h2 id="hb71f3638bb">Heading 2</h2><h3 id="h055e8f9099">Heading 3</h3><h4 id="h8c98ba6ad9">Heading 4</h4><h5 id="he1b3d42007">Heading 5</h5><p>test content<br><span style="font-size: 0.75em">test content</span><br><span style="font-size: 1.5em">test content</span><br><span style="font-size: 2.5em">test content</span></p><p style="padding-left:3em">test content indent 1</p><p><em>test content</em><br><strong>test content</strong><br><strong><em>test content</em></strong><br><u>test content</u><br><s>test content</s><br><code>test content</code><br><span style="background-color:#e795a0">test content</span></p><p style="text-align:center">test content</p><p style="text-align:right">test content</p><p style="text-align:justify">test content</p><blockquote>test content</blockquote><pre><code>const print = (): string =&gt; \'test content\';\nconst print = (): string =&gt; \'test content\';</code></pre><p>&lt;pre&gt;&lt;code&gt;<br>const print = (): string =&gt; \'test content\';<br>&lt;/code&gt;&lt;/pre&gt;<br></p><ol><li>item 1</li><li>itme 2</li></ol><p><br></p><ul><li>item 1</li><li>item 2<ul><li>item 2-1<ul><li>item 2-1-1</li></ul></li><li>item 2-2</li></ul></li></ul><p><a href="https://example.com" target="_blank" rel="noopener noreferrer">text content</a><br><a href="/">text content</a></p><p style="text-align:right"><img src="https://images.microcms-assets.io/assets/cc2f36d0ef1841d88d1dfdef8a3cf3e2/1e20afcd5f6c4fc590743f24e8012760/neko.png?w=490&amp;h=276" alt="test" width="490" height="276"></p><p><br></p>',
  "tags": [
    {
      "id": "hpkvftsy70y",
      "createdAt": "2023-01-23T07:27:47.668Z",
      "updatedAt": "2023-01-23T07:27:47.668Z",
      "publishedAt": "2023-01-23T07:27:47.668Z",
      "revisedAt": "2023-01-23T07:27:47.668Z",
      "title": "tech",
    },
    {
      "id": "3yehaq_nxec",
      "createdAt": "2023-01-23T07:25:14.800Z",
      "updatedAt": "2023-01-23T07:25:14.800Z",
      "publishedAt": "2023-01-23T07:25:14.800Z",
      "revisedAt": "2023-01-23T07:25:14.800Z",
      "title": "test",
    },
  ],
};

export type Data = {
  post: Post;
};

function getPost(id: string) {
  const client = getMicroCmsClient();
  return client.get<Post>({
    resource: "posts",
    id,
    richEditorFormat: "object",
  });
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    try {
      // const id = ctx.params.id;
      // const post = await getPost(id);
      // console.log(post);
      const data: Data = { post: responseJson };
      const resp = await ctx.render(data);
      return resp;
    } catch (error) {
      if (isFetchError(error)) {
        if (error.response.status === 404) {
          return ctx.renderNotFound();
        }
      }
      return Promise.reject(error);
    }
  },
};
