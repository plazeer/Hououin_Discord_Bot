const got = require('got');
const languages = require('./languages.js');

function translate(text, options, gotopts) {
    options = options || {};
    gotopts = gotopts || {};
    let error;

    for (const lang of [options.from, options.to]) {
        if (lang && !languages.isSupported(lang)) {
            error = new Error('The language \'' + lang + '\' is not supported');
            error.code = 400;
        }
    }

    options.apiKey = options.apiKey || '';
    if (options.apiKey === '') {
        error = new Error('Please provide an API Key');
        error.code = 400;
    }

    if (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }

    options.from = options.from || 'auto';
    options.to = options.to || 'en';

    options.from = languages.getCode(options.from);
    options.to = languages.getCode(options.to);

    options.domain = options.domain || 'https://api-free.deepl.com';

    let url = options.domain + '/v2/translate?auth_key=' + options.apiKey + '&text=' + encodeURIComponent(text) + '&target_lang=' + options.to;
    if (options.from !== undefined && options.from !== 'auto') {
        url += '&source_lang=' + options.from;
    }

    if (gotopts.headers === undefined) {
        gotopts.headers = {};
    }

    gotopts.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    return got.post(url, gotopts).then(response => {
        const result = {
            text: '',
            from: {
                language: {
                    didYouMean: false,
                    iso: '',
                },
            },
            raw: '',
        };

        if (options.raw) {
            result.raw = response.body;
        }

        const json = JSON.parse(response.body)?.translations?.[0];
        if (json === undefined) {
            return result;
        }

        result.text = json.text;
        result.from.language.didYouMean = json.detected_source_language.toString().toLowerCase() !== options.from.toLowerCase();
        result.from.language.iso = languages.getCode(json.detected_source_language.toLowerCase());

        return result;
    }).catch(error => {
        error.message += `\nUrl: ${url}`;
        error.code = error.statusCode !== undefined && error.statusCode !== 200 ? 'BAD_REQUEST' : 'BAD_NETWORK';

        throw error;
    });
}

module.exports = translate;
module.exports.languages = languages;
