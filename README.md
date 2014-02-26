# Mini Livereload

Really livereload server just for quick prototyping.

### Usage

Use with `koa`?

```
var fs = require('fs');
var koa = require('koa');
var app = module.exports = koa();
var serve = require('koa-static');
var port = process.env.PORT || 3000;
var route = require('koa-route');
var mini = require('mini-livereload')();
var livereload = require('koa-livereload');

app.use(livereload());
app.use(serve(__dirname + '/build'));

app.use(route.get('/', function *(){
  var index = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  this.body = index;
}));

app.listen(port);
mini.listen(35729);

console.log('Listening to %s', port);
```

### LICENSE
  MIT
