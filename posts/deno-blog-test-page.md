---
title: deno_blog のテストページ
date: 2022-09-15
cssclass: blog-deno
modified: 2022-11-07
publish_date: 2022-09-15
AutoNoteMover: disable
tags: [deno, Testing]
aliases: deno_blog のテストページ
---

## コードブロック

JavaScript

```js
const p = "string";
```

TypeScript

```ts
const p = "string" as string;
```

TSX

```tsx
const p = "string";
const Page = (): NextPage => {
  return <div>test</div>;
};
```

ファイル名を付けると syntax-highlight されない。

```tsx:test.tsx
const p = "string";
const Page = (): NextPage => {
  return <div>test</div>;
};
```

## diff

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

## 画像表示

`posts/images/` 配下にある画像を表示してみる。

マークダウン表示。

```md
![これは画像](images/img_testImage.jpg)
```

![test image](images/img_testImage.jpg)

## リンク

wiki link [[deno-blog-making|deno_blog の作り方]]

通常の markdown リンク [deno-blog-making](deno-blog-making.md)
