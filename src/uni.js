const adapter = require('../index')

const http = (options) => {
	
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

module.exports =  adapter(http)