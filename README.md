# vue-monaco-editor-zh

> Monaco Editor Vue Component

> Based off [React Monaco Editor](https://github.com/superRaytin/react-monaco-editor) [vue-monaco-editor](https://registry.npmjs.org/vue-monaco-editor/-/vue-monaco-editor-0.0.19.tgz)

> [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

## Setup

``` bash
npm install vue-monaco-editor-zh --save
```

## Simple Vue Use

```js
import MonacoEditor from 'vue-monaco-editor-zh'

// use in component
export default {
  components: {
    MonacoEditor
  }
}
```

## Component Props

| Option        | Type          | Default | Description
|:-------------|:-------------|:-------|:-------|
| language      | String        | `javascript` | |
| height        | Number/String | `100%` ||
| width | Number/String | `100%` ||
| code | String | `// code \n` | Initial code to show |
| theme | String | `vs-dark` | vs, hc-black, or vs-dark |
| highlighted | Array[Object] | `[{ number: 0, class: ''}]` | Lines to highlight with numbers and `.classes` |
| changeThrottle | Number(ms) | `0` |  throttle `codeChange` emit |
|srcPath| String | `""` | see *Webpack Use* below
| editorOptions | Object | Merged with defaults below | See [Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html) |

### Editor Default Options
```js
defaults: {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: false,
  glyphMargin: true
}
```

## Component Events

*These events are available to parent component*

| Event        | Returns          | Description
|:-------------|:-------------|:-------|
|mounted|`editor`[editor instance]|Emitted when editor has mounted|
|codeChange|`editor`[editor instance]|Emitted when code has changed|

## Example

*Component Implementation*
```vue
<MonacoEditor
    height="600"
    language="typescript"
    :code="code"
    :theme="vs"
    :editorOptions="options"
    @mounted="onMounted"
    @codeChange="onCodeChange"
    >
</MonacoEditor>
```

*Parent*
```js
module.exports = {
  components: {
    Monaco
  },
  data() {
    return {
      code: '// Type away! \n',
      options: {
        selectOnLineNumbers: false
      }
    };
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    onCodeChange(editor) {
      console.log(this.editor.getValue());
    }
  }
};
```

## Webpack Use

By default, monaco-editor is loaded from a cdn asyncronously using `require`. To use a local copy of `monaco-editor` with webpack, we need to expose the dependency in our build directory:

`npm install copy-webpack-plugin --save-dev`

Add this to your webpack.config.js:

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
      }
    ])
  ]
};
```

Then, specify the build directory path in the `srcPath` prop. See `src/App.vue` for an example.

## Dev Use

```
git clone [this repo] .
npm install
npm run dev
```

Edit `src/App.vue`



## 注意

由于微软的域名要翻墙,所以把vs相关的代码全部拷贝下来了.

集成到自己项目使用的时候, 需要把static中的vs目录复制到你自己当前项目的/public/static下.