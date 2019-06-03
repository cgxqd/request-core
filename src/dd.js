const adapter = require('../index')

const http = (options) => {

  // console.log('dd js options', options)

  return new Promise((succ, fail) => {

    my.httpRequest({
      ...options,
      headers:options.header,
      success({data,headers,status}) {
        succ({data,header:headers,statusCode:status});
      },
      fail(err) {
        fail(err);
      }
    })
  });
}

export default adapter(http)