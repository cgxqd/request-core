const adapter = require('../index')

const isObj = val => Object.prototype.toString.call(val).includes('Object');

const URLSearchParams = param => Object.keys(param).map(key => `${key}=${encodeURIComponent(JSON.stringify(param[key]))}`).join('&')

const http = (options = {}) => {
    let { header: headers, data: body, url, ...other } = options;
    if (options.method.toUpperCase() === 'GET') {
        url = `${url}${isObj(body) ? '?' + URLSearchParams(body) : null}`
        body = null;
    }
    return fetch(url, {
        ...other,
        body,
        headers,
    }).then(async response => {
        var { bodyUsed, ok, redirected, status: statusCode, statusText, type, url, ...otherObj } = response2 = response.clone();
        let data = null;
        try {
            switch (options.dataType) {
                case 'blob': {
                    data = await response.blob();
                    break
                }
                case 'text': {
                    data = await response.text()
                    break
                }
                default: {
                    data = await response.json()
                    break
                }
            }
        } catch (err) {
            return Promise.reject({ errMsg: err.message, statusCode, bodyUsed, ok, redirected, statusText, type, url })
        }
        return Promise.resolve({ data, statusCode, bodyUsed, ok, redirected, statusText, type, url })
    })

}

module.exports = adapter(http)