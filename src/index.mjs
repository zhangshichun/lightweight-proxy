import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

// --------- 看这里 ↓ -------------------------

// 凡是以 '/prod-api' 开头的都认定为 xhr 请求 
app.use('/prod-api', createProxyMiddleware({
  target: 'https://dev.my-server.com/', // 这一行是你的服务端地址
  changeOrigin: true,
  pathRewrite: {
    '^/prod-api': '' // 在向服务端发起请求时，去掉标识xhr的前缀
  }
}));

// 其他请求则认定为前端资源请求，如：html/js/css 等
app.use('/', createProxyMiddleware({
  target: 'http://localhost:9527/',
  changeOrigin: true
}));
// --------- 看这里 ↑ -------------------------

app.listen(3000);