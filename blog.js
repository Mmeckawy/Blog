const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const api = require('./controllers/SportController')
const timeout = require('connect-timeout');

const app = express();
const DBlink = 'mongodb+srv://mmeckawy:7b8c9F@task1.iuem4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DBlink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
      app.listen(process.env.PORT || 4080);
    })
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(timeout('120s'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


app.use('/blogs', blogRoutes);
app.use(api);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
