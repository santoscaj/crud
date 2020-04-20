require("@babel/register");
const Koa = require('koa');

const app = new Koa()

app.use(async ctx =>{
    ctx.body = 'Hello maniggas world'
})

app.listen(3000)