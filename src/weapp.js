import {adapter} from '../index.js'

const http = (options) => {
	
	// console.log('wx js options',options)
	
    return new Promise((succ, fail) => {

        wx.request({
            ...options,
            success(res) {
				succ(res);
            },
			fail(err){
				fail(err);
			}
          })
	});
}

export default adapter(http)