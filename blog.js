const express = require('express');
const app = express();

app.listen(4080);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Tokyo 2020 Paralympics Games', snippet: 'August 24, 2021 – September 5, 2021'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});