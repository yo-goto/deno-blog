---
title: deno-blogのテストページ
publish_date: 2022-09-15
date: 2022-09-15
modified: 2022-09-15
tags: [deno, Testing]
aliases:
  - deno-blogのテストページ
---

これはテストですよ。

```tsx
const p = "string";
const Page = (): NextPage => {
  return <div>test</div>;
};
```

ファイル名を付けてみる。

```tsx:test.tsx
const p = "string";
const Page = (): NextPage => {
  return <div>test</div>;
};
```

diff を作ってみる。

```diff tsx
const p = "string";
const Page = (): NextPage => {
- return <div>test</div>
+ return (
+   <div>
+     test
+   </div>
+ );
};
```

`posts/images/` 配下にある画像を表示してみる。

マークダウン表示。

```md
![これは画像](images/img_testImage.jpg)
```

![test image](images/img_testImage.jpg)
