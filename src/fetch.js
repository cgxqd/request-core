const adapter = require('../index')

const http = (options = {}) => {
    options.dataType = options.dataType || 'json'
    let { header: headers, data: body, ...other } = options;
    return fetch(options.url, {
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
            return Promise.reject({ statusCode, bodyUsed, ok, redirected, statusText, type, url })
        }
        return Promise.resolve({ data, statusCode, bodyUsed, ok, redirected, statusText, type, url })
    })

}

module.exports = adapter(http)