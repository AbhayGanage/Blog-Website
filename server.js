const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const port=4000;

mongoose.connect('mongodb://localhost:27017/bharatInternDatabase')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' }).maxTimeMS(10000); // Set maximum execution time to 10 seconds (10000 milliseconds)
        res.render('articles/index', { articles: articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        // Handle the error gracefully, e.g., render an error page or send an error response
        res.status(500).send("Error fetching articles");
    }
});

// app.get('/', async(req, res) => {
//     const articles =await Article.find().sort({ createdAt:'desc'})
//     res.render('articles/index', { articles: articles })
// })

app.use('/articles', articleRouter)

app.listen(port,()=>{
    console.log(`app is running on http://localhost:${port}`)
})