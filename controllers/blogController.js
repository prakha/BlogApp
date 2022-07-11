const res = require("express/lib/response");
const Blog = require("../models/blog")

const blog_index = async (req, res) => {
  try{
    const result = await Blog.find().sort({createdAt: -1});
    res.render("index", { title: "All Blogs", blogs: result });
  }
  catch(err){
    console.log(err);
  }
};

const blog_details = (getBlog , async(req, res) => {
    res.render("details", { blog: result, title: "Blog Details" });
});

const blog_create_get = (req, res) => {
     res.render("create", { title: "Create a new blog" });
}

const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body);
    try{
        await blog.save();
        res.redirect("/blogs");
      } 
      catch(err){
        console.log(err);
      }
}

const blog_delete = (getBlog, async (req, res) => {
    try{
      await res.blog.remove();
      res.json({ redirect: "/blogs" });
    }catch(err){
        console.log(err);
    }
});

async function getBlog(req, res , next){
  let blog;
  try{
    let blog = await Blog.findById(req.params.id);
    if(blog == null){
         return res.status(404).json({ message: 'Cannot find subscriber' });
    }
  }catch(err){
       return res.status(500).json({ message: err.message });

    }
    res.blog = blog;
    next();
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};