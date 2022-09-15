/** @jsx h */

import "./prism-extension.ts";

blog({
  title: "pd1's blog",
  description: "PADAone's Personal Blog",
  // header: <header>Your custom header</header>,
  // section: <section>Your custom section</section>,
  // footer: <footer>Your custom footer</footer>,
  avatar: "https://deno-avatar.deno.dev/avatar/54eaa7.svg",
  avatarClass: "rounded-full",
  author: "PADAone",
  lang: "ja",

  // middlewares: [

    // If you want to set up Google Analytics, paste your GA key here.
    // ga("UA-XXXXXXXX-X"),

    // If you want to provide some redirections, you can specify them here,
    // pathname specified in a key will redirect to pathname in the value.
    // redirects({
    //  "/hello_world.html": "/hello_world",
    // }),

  // ]
});