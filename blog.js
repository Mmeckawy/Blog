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

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'Tokyo 2020 Paralympics Games',
    snippet: 'August 24, 2021 – September 5, 2021',
    body: 'more news'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
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

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});