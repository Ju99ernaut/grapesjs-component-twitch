# Grapesjs Component Twitch

Dedicated twitch block based on docs [here](https://dev.twitch.tv/docs/embed/everything).

## Summary

* Plugin name: `grapesjs-component-twitch`
* Components
    * `twitch`
* Blocks
    * `Twitch`



## Options

| Option | Description | Default |
|-|-|-
| `script` | Twitch embed script | `https://embed.twitch.tv/embed/v1.js` |
| `block` | Options for twitch block  | `{}` |
| `label` | Twitch block label | `Twitch` |
| `category` | Twitch block categort | `basic` |
| `props` | Customize component props | `props: i => i` |


## Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-component-twitch';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```