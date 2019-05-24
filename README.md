# [request-core](https://github.com/cgxqd/request-core)


多端网络请求

>  目的：实现各多端框架（`taro`、`uniApp`、`mpvue` 等）统一请求代码。


基于 Promise 对象实现更简单的 request 使用方式，支持`请求拦截`、`响应拦截`和`全局配置`，为项目迁移到别的框架实现解耦。欢迎为本项目提issus。

## 安装

### 依赖包下载
``` bash
# 使用 npm 安装
$ npm i request-core

# OR 使用 cnpm 安装
$ cnpm i request-core

# OR 使用 yarn 安装
$ yarn add request-core
```

## 使用

### Taro引用方式
```javascript
import http from 'request-core/src/taro'
```

### uniApp引用方式
```javascript
import http from 'request-core/src/uni'
```

### 全局配置

> 可用的全局配置 `baseURL`、`url`、`data`、`header`、`method`、`dataType`和框架自带的其他配置，比如Taro h5 端的配置。

```javascript
http.config = {
	dataType:'text',
	baseURL:'http://localhost:3000',
	header: {
		"Content-Type": "awe5g45aewg45ewg1",
	},
}
```

### 请求拦截
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

### 使用方式1
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

### 使用方式2
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
