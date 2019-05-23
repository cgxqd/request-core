import {adapter} from '../index.js'

const http = (options) => {
	console.log('taro js options',options)
	return new Promise((succ,fail) => {
		Taro.request({
			...options,
			success(data){
				succ(data);
			},
			fail(err){
				fail(err);
			}
		})
	})
}



export default adapter(http)