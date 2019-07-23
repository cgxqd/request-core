const adapter = require('../index')

const http = (options) => {
  let data = options.header['Content-Type'] === 'application/json' ? JSON.stringify(options.data) : options.data;
  return new Promise((succ, fail) => {
    let __options = {
      ...options,
      data,
      headers: options.header,
      success({ data, headers, status }) {
        succ({ data, header: headers, statusCode: status });
      },
      fail(err) {
        fail(err);
      }
    }
    if (my.canIUse('request')) return my.request(__options)
    else if (my.canIUse('httpRequest')) return my.httpRequest(__options)
  });
}

export default adapter(http)