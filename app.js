const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan  = require('morgan')
const app = express()

app.set('public', path.join(__dirname, 'public'))
app.set('view engine', 'jade')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', require('./routes/index'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Route not Found');
  err.status = 404;
  next(err);
})

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
})

app.listen(9009, () => {
  console.log('Server is started on localhost:9009');
})

module.exports = app
