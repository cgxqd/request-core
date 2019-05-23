import {adapter} from '../index.js'

const http = (options) => {
	
	console.log('uni js options',options)
	
    return new Promise((succ, fail) => {
		uni.request({
			...options,
			success(data){
				succ(data);
			},
			fail(err){
				fail(err);
			}
		})
	});
}

export default adapter(http)