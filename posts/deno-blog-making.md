---
title: deno_blog の作り方
cssclass: blog-deno
date: 2022-09-15
modified: 2022-11-22
publish_date: 2022-09-15
AutoNoteMover: disable
tags: [deno]
aliases: deno_blog の作り方
---

## deno_blog とは

Deno の開発者である Ryan Dahl 氏のブログテンプレート(ボイラーテンプレート)。

以下の Zenn の記事にて作り方が詳細に解説されていたので参考にした。

[【Deno】秒で作ってデプロイする Markdown ベースのブログ](https://zenn.dev/k41531/articles/9897a0f8fce1b3)

公式のリポジトリは以下の URL から。

https://github.com/denoland/deno_blog

作成した deno-blog サイト URL は以下。

https://yo-goto-deno-blog.deno.dev

## 作り方

プロジェクトの初期化。

```sh
$ mkdir deno-blog
$ cd ./deno-blog
# カレントディレクトリにプロジェクトを展開
$ deno run -r --allow-read --allow-write https://deno.land/x/blog/init.ts .
```

以下のようなディレクトリ構造が展開されるので、`posts` ディレクトリ以下に記事用のマークダウンファイルを作成する。

```sh
./
├── .vscode/
│  └── settings.json
├── deno.jsonc
├── import_map.json
├── main.tsx
└── posts/
    └── hello_world.md
```

以下のコマンドでライブリロードできるローカルサーバーを起動。

```sh
deno task dev
```

`main.tsx` で基本となる設定を行っておく。`unocss` でのカスタマイズを行わないなら当該箇所は書かなく良い。

```tsx
import blog, { ga, redirects } from "https://deno.land/x/blog/blog.tsx";
import { unocss_opts } from "./unocss.ts";

blog({
  author: "Dino",
  title: "My Blog",
  description: "The blog description.",
  avatar: "avatar.png",
  avatarClass: "rounded-full",
  links: [
    { title: "Email", url: "mailto:bot@deno.com" },
    { title: "GitHub", url: "https://github.com/denobot" },
    { title: "Twitter", url: "https://twitter.com/denobot" },
  ],
  lang: "en",
  dateStyle: "long", // localised format based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  middlewares: [
    ga("UA-XXXXXXXX-X"),
    redirects({
      "/foo": "/my_post",
      // you can skip leading slashes too
      bar: "my_post2",
    }),
  ],
  unocss: unocss_opts, // check https://github.com/unocss/unocss
  favicon: "favicon.ico",
});
```

コードブロックのシンタックスハイライトが C 言語しかデフォルトでは入っていないので、使用するものを以下のサイトにリストアップされているものから選んで `import` しておく。

https://unpkg.com/browse/prismjs@1.27.0/components/

`prisim-extension.ts` などのファイルを作成してそこに `import` する。インポートは Deno をサポートしている [esm.sh](https://github.com/ije/esm.sh#deno-compatibility) から行う。

```ts
import "https://esm.sh/prismjs@1.27.0/components/prism-markdown?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-bash?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-rust?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-jsx?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-tsx?no-check";
```

`import` する順番を適切に行わないとエラーになるので注意。`tsx` は `jsx` と `typescript` の後に `import` する。また、バージョンも `1.27.0` にしておく。

これを `main.tsx` で `import` する。

```tsx
import "./prism-extension.ts";
```

基本的なものは用意したので `git` の初期化と最初のコミットを行う。

```sh
$ git init
$ git add -A
$ git commit -m "initial commit"
```

GitHub CLI または GitHub のウェブサイトからリポジトリを作成しておく。リポジトリの URL を取得して以下のコマンドを実行。

```sh
$ git remote add origin <リポジトリURL>
$ git push origin main
```

あとは [Deno Deploy](https://deno.com/deploy) でデプロイする。Deno Deploy のサイトで GitHub のリポジトリ連携を行えば OK。

## Deno Deploy での JSX の使用

src: https://deno.com/deploy/docs/using-jsx

`.tsx` ファイルの頭に宣言することで JSX の構文が利用できるようになる。関数コンポーネントなどが `h.JSX.Element`
型として型推論されるようになる。

```tsx
/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
```

> Deno Deploy supports JSX (and TSX) out of the box. You don't need an
> additional transform step to use JSX with Deno Deploy.\
> ([Using JSX - Deploy Docs](https://deno.com/deploy/docs/using-jsx) より引用)

Deno Deploy ではすぐに JSX と TSX を利用できる。

> [!NOTE]
> Deno での JSX の使用方法についてはついては後で詳しく調べる

## なにがよいのか

ファイル数が少なくて済むのが非常によい。最小構成の場合には、以下のものしか必要ない。

```sh
./
├── .vscode/
│  └── settings.json
├── deno.jsonc
├── import_map.json
├── main.tsx
└── posts/
    └── hello_world.md
```

画像の取り扱いが比較的に自由。

`posts` ディレクトリ内に `images` ディレクトリなどをつくってまとめてそこで画像を管理すればノート内でプレビューしつつつも一元管理できる。

Hugo だとこのようなことができないのでかなり楽。また、`node_modules` フォルダが無いのが一番良い。このフォルダ内部にノートが送られてしまう心配がまったくない。通常はこのフォルダに送られてしまうと見つけるのはほぼ不可能になる。
