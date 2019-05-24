const adapter = require('../index')

let Taro = null
if (process.env.TARO_ENV === 'weapp') {
	Taro = require('@tarojs/taro-weapp')
} else if (process.env.TARO_ENV === 'h5') {
	Taro = require('@tarojs/taro-h5')
}

const http = (options) => {
	return new Promise((succ, fail) => {
		Taro.request({
			...options,
			success(data) {
				succ(data);
			},
			fail(err) {
				fail(err);
			}
		})
	})
}

module.exports = adapter(http)
