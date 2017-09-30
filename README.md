# SSR SERVICE

> 变相服务端渲染服务，为SEO、低版本IE浏览器输出单页应用

**本系统会通过无界面[chrome](https://github.com/GoogleChrome/puppeteer)，渲染出页面再将静态html返回，解决单页应用seo问题，方便实用。**

## Usage

`npm install && npm start`

## APIS

### Get Page

- url: `/spider`
- method: `post` | `get`
- params:
  - `{string} url`: **必填**, 请求地址，若有特殊字符如“#”，请先urlencode
  - `{string} activeTime`: 有效时间（静态模板缓存时间，单位为秒， 默认60秒，设为0则不缓存）
  - `{realtime} boolean`: 是否实时获取（设为true，则会每次重新抓取页面，不走缓存，默认false）
  - `{string} selector`: 元素选择器（设置元素后，页面会等待此元素加载完成再返回页面）
  - `{string} timeout`: 等待时间（设置此值后，会等设定时间后再返回页面，单位毫秒）
  - `{string} pageTimeout`: 最长等待时间（超过此时间，将返回系统错误，单位毫秒，默认10秒）

### Clear Page Cache

- url: `/clear`
- method: `get`
- params:
  - `{string} url`: **必填**, 需要清除缓存的请求地址，若有特殊字符如“#”，请先urlencode


### Flow Chart

![](https://user-gold-cdn.xitu.io/2017/9/30/241c30c3fb75ba37c6178cd447de2ce3)
