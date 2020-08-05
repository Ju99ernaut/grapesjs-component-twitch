# Grapesjs Component Twitch

Twitch embed component based on docs [here](https://dev.twitch.tv/docs/embed/everything).

> Requires server for more accurate preview in the `grapesjs` editor

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-component-twitch"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: true,
  plugins: ['grapesjs-component-twitch'],
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```

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
| `category` | Twitch block category | `Basic` |
| `props` | Customize component props | `i => i` |

## Download

* CDN
  * `https://unpkg.com/grapesjs-component-twitch`
* NPM
  * `npm i grapesjs-component-twitch`
* GIT
  * `git clone https://github.com/Ju99ernaut/grapesjs-component-twitch.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-component-twitch.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-component-twitch'],
      pluginsOpts: {
        'grapesjs-component-twitch': { /* options */ }
      }
      // ...
  });
</script>
```


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

Clone the repository

```sh
$ git clone https://github.com/Ju99ernaut/grapesjs-component-twitch.git
$ cd grapesjs-component-twitch
```

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

## License

MIT
