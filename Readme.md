#  Modified Version of XIVDB Tooltips

![Example](http://i.imgur.com/tj8lRab.png)

This is a modified version of [xivdb/tooltips](https://github.com/xivdb/tooltips) which has the following features:

* 784 bytes (2.4kb smaller).
* No jQuery dependency.
* Different `data-*` attribute syntax.

...but also has the following drawbacks:

* No configuration.
* Fixed positions.
* No screen height or width detection.
* No body content replacement.

⚠️ This **doesn't** include any CSS. To apply styling you'll need to grab the relevant CSS files from [xivdb/tooltips](https://github.com/xivdb/tooltips).

## Demo

A live demo is available [on Codepen](https://codepen.io/inb4/full/oWJQpW/).

## Usage

Any HTML element with both `data-type` and `data-id` attributes will have a tooltip generated on hover provided that the type is valid and the ID exists.

The `data-type` attribute may be one of the following: `achievement`, `action`, `emote`, `enemy`, `fate`, `gathering`, `instance`, `item`, `leve`, `npc`, `minion`, `mount`, `placename`, `quest`, `recipe`, `shop`, `status`, `title` or `weather`.

### Example

```html
<body>
  <span data-type="item" data-id="1228">Apkallu Falls Painting</span>
  ...
  <script src="tooltips.min.js"></script>
</body>
```
