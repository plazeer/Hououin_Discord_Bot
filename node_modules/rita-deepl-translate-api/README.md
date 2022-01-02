# deepl-translate-api

An API for DeepL Translate, designed for the Discord Translation Bot, [RITA](https://ritabot.org/).

## Features

- Auto language detection
- Source Language correction

## Usage

From automatic language detection to English:

``` js
const translate = require('rita-deepl-translate-api');

translate('Ik spreek Engels', {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});
```

## API

### translate(text, options)

#### text

Type: `string`

The text to be translated

#### options

Type: `object`

##### from

Type: `string` Default: `auto`

The `text` language. Must be `auto` or one of the codes/names (not case-sensitive) contained in [languages.js](https://github.com/toitzi/deepl-translate-rita/blob/master/languages.js)

##### to

Type: `string` Default: `en`

The language in which the text should be translated. Must be one of the codes/names (not case-sensitive) contained in [languages.js](https://github.com/toitzi/deepl-translate-rita/blob/master/languages.js).

##### raw

Type: `boolean` Default: `false`

If `true`, the returned object will have a `raw` property with the raw response (`string`) from DeepL Translate.

##### domain

Type: `string` Default: `"https://api-free.deepl.com"`

DeepL uses different domains for free and non-free versions, you can change this to use the non-free version.

##### apiKey (required)

Type: `string` Default: `""`

DeepL needs an API Key in order to accept request - even in the free version. Please specify your DeepL API Key!

### Returns an `object`:

- `text` *(string)* – The translated text.
- `from` *(object)*
    - `language` *(object)*
        - `didYouMean` *(boolean)* - `true` if the API suggest a correction in the source language
        - `iso` *(string)* - The [code of the language](https://github.com/toitzi/deepl-translate-rita/blob/master/languages.js) that the API has recognized in the `text`
- `raw` *(string)* - If `options.raw` is true, the raw response from DeepL Translate servers. Otherwise, `''`.
