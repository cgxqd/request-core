# [request-core](https://github.com/cgxqd/request-core)


多端网络请求

>  目的：实现各多端框架（taro,uniApp,mpvue等）统一请求代码。


基于 Promise 对象实现更简单的 request 使用方式，支持请求、响应拦截和全局配置。为项目迁移到别的框架实现解耦。

## 1、安装

### 1.1、npm
``` bash
$ npm i request-core
```

### 1.2、yarn
``` bash
$ yarn add request-core
```

### 1.3、cnpm
``` bash
$ cnpm i request-core
```

## 2、使用

### 2.1、Taro引用方式
```javascript
import http from 'request-core/src/taro'
```

### 2.2、uniApp引用方式
```javascript
import http from 'request-core/src/uni'
```

### 2.3、全局配置

> 可用的全局配置 `baseURL`、`url`、`data`、`header`、`method`、`dataType`。

```javascript
http.config = {
	dataType:'text',
	baseURL:'http://localhost:3000',
	header: {
		"Content-Type": "awe5g45aewg45ewg1",
	},
}
```

### 2.4、请求拦截
```javascript
http.interceptors.request.use(config=>{
	console.log('请求拦截',config)
	config.data.name = '测试'
	return config
},err=>{
	console.log('拦截请求报错',err)
})

http.interceptors.response.use((res)=>{
	console.log('响应拦截',res)
	return res.data
},(err)=>{
	console.log('拦截响应报错',err)
})
```

> 局部配置优先级高于全局配置，全局配置优先级高于默认配置。

### 2.5、使用（1）
```javascript
http({
	url:'users/test3',
	data:{
		name:'111',
		test:'222',
	},
}).then(res=>{
	console.log('请求结果',res)
}).catch(err=>{
	console.log('报错了》》》》',err)
})
```

### 2.6、使用（2）
```javascript
http.get('users/test3',{
    name:'111',
    test:'222',
})
.then(res=>{
    console.log('请求结果',res)
}).catch(err=>{
    console.log('报错了》》》》',err)
})
```
