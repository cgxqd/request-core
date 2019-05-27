module.exports = (http) => {
	let interceptors = null;

	//默认配置
	let _defaultConfig = {
		baseURL: '',
		url: '',
		data: undefined,
		header: {
			"Content-Type": "application/json",
		},
		method: 'GET',
		dataType: 'json',
	}



	/** 
	 * 判断url是否为绝对路径
	 * */
	let posUrl = (url) => /(http|https):\/\/([\w.]+\/?)\S*/.test(url)

	let $request = (options) => {

		// 合并默认配置和全局配置
		Object.assign(_defaultConfig, $request.config)

		let requestInterceptor = interceptors.request;
		let responseInterceptor = interceptors.response;

		// 合并请求参数
		options = Object.assign(_defaultConfig, options)

		options.baseURL = options.baseURL || $request.config.baseURL
		options.dataType = options.dataType || $request.config.dataType
		options.data = options.data || {}
		options.header = options.header || $request.config.header
		options.method = options.method || $request.config.method
		options.url = posUrl(options.url) ? options.url : (() => {
			if (options.baseURL && posUrl(options.baseURL)) {
				return options.baseURL.replace(/\/?$/, '/') + options.url.replace(/^\/?/, '')
			} else {
				throw new Error('请求路径不合法')
			}
		})()

		options = onresult(requestInterceptor.handler, options)
		if (!options) {
			onresult(requestInterceptor.onerror, {
				errMsg: '请求截止'
			})
			return Promise.reject({
				errMsg: '请求截止'
			})
		}

		return new Promise((resolve, reject) => {

			http(options).then(res => {

				let _request = {
					...res,
					request: options
				}
				if (res.statusCode === 200) {
					_request = onresult(responseInterceptor.handler, _request)
					resolve(_request)
				} else {
					_request = onresult(responseInterceptor.onerror, _request)
					reject(_request)
				}
			}).catch(err => {
				onresult(requestInterceptor.onerror, err)
				reject(err)
			})
		})
	}

	var onresult = (handler, data) => handler && handler(data)

	interceptors = $request.interceptors = {
		request: {
			use(handler, onerror) {
				this.handler = handler;
				this.onerror = onerror;
			}
		},
		response: {
			use(handler, onerror) {
				this.handler = handler;
				this.onerror = onerror;
			}
		}
	}

	return new Proxy($request, {
		get(obj, name) {
			
			let _methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];
			let _method = name.toLocaleUpperCase()
			if (_methods.includes(_method)) return (url, data, options = {}) => {
				return $request({
					...options,
					url,
					data,
					method: _method
				})
			}
			else return obj[name]

		}
	})
};
