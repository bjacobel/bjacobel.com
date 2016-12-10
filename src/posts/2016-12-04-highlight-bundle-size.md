---
title: "Reducing bundle size of Highlight.js with Webpack"
date: 2016-12-04 09:33:00
url: /2016/12/04/highlight-bundle-size/
---

A basic requirement for a developer's blog is syntax highlighting, and one of the most recommended library for doing syntax highlighting in JavaScript is [Highlight.js](https://highlightjs.org/). However, Highlight's uncustomizable builds and large size make it difficult to work with on high-performing websites. Here's how I tamed the default Highlight.js build using Webpack's `ContextReplacementPlugin`, an approach which may generalize to other libraries.

Lots of modern libraries allow importing only certain modules, like RxJS (`import 'rxjs/add/operator/map';`) and Lodash (`import merge from 'lodash/merge';`). This can help keep bundle size down. However, Highlight.js and many libraries like it were written in an age before fleshed-out module systems and sophisticated bundlers. Though importing only the languages we need from Highlight isn't supported out of the box, Webpack can help us make a build that fits our needs.

First, here's a look at the size of the problem. By default, including Highlight.js on this website produces a build where Highlight is 66% of the total bundle - 683k minified. By comparison, React + ReactDOM minified are 148k. (This site uses [Preact](https://preactjs.com/).)

![Bundle size with Highlightjs before configuration](https://i.bjacobel.com/20161209-yuzyv.png)

Key to this size issue is including every single language Highlight supports by default - over 150 of them. I won't ever embed snippets of many of the languages on this site (I don't even know them) and some are over 50k alone. Let's get rid of them.

Here's a starting point for using Highlight.js in a React component, before customizing the build.

```javascript
import hljs from 'highlight.js';

export default class CodePost extends Component {
  componentDidMount() {
    document.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  // ...
}
```

Now, rather than importing all of Highlight, let's just import a single language from the `highlight.js/lib/languages` folder.

```javascript
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);
```

If you have some languages you want to whitelist, you can grab them all at once like this:

```javascript
import hljs from 'highlight.js/lib/highlight';

['javascript', 'python', 'bash'].forEach((langName) => {
  // Using require() here because import() support hasn't landed in Webpack yet
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});
```

At this point, only the languages you want are imported in your application - but all languages will still be present in the Webpack production bundle*. The final piece we need to drop them completely is Webpack's [`ContextReplacementPlugin`](https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin), which intercepts requests for non-whitelisted modules, disallowing them from the build. Using the same list of whitelisted languages as an example, the following Webpack config file's plugins array will only allow those four languages to be required, and will replace requests to all other languages with an empty module.

```javascript
module.exports = {
  ...
  plugins: [
    ...
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${['javascript', 'python', 'bash'].join('|')})$`),
    ),
  ],
  ...
}
```

Here's the same site, with those Highlight.js configurations applied. We've eliminated almost 95% of the default bytes of Highlight.js, resulting in a version that's only 38.4k and supports all the languages we need!

![highlight.js built size, after configuration](https://i.bjacobel.com/20161209-4e6nd.png)

&#42; Using Webpack 2, these non-imported languages may be eliminated automatically through tree shaking. I'll revisit this one Webpack 2 is released.



