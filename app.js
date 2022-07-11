const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');

const blogRoutes = require('./routes/blogRoutes');
// express app
const app = express();
const dbURI =
  "mongodb+srv://dbUser:nWB7HiPMkODUA7SI@cluster0.pkbbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  //built in middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// register view engine
app.set("view engine", "ejs");

// app.set('views', 'myviews');
// routes
app.get("/", (req, res) => {
  res.redirect('/blogs');
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs',blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});