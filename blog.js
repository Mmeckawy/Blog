const Blog = require('./models/database');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const DBlink = 'mongodb+srv://mmeckawy:7b8c9F@task1.iuem4.mongodb.net/myDB1?retryWrites=true&w=majority';
mongoose.connect(DBlink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4080))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
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

app.get('/blogs', (req, res) =>{
  Blog.find().sort({ createdAt: -1 })
  .then((result) => {
    res.render('index', { blogs: result, title: 'All blogs' });
  })
  .catch(err => {
    console.log(err);
  });
})

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});