var fs = require('fs');
var blogs = JSON.parse(fs.readFileSync('./data/blogs.json', 'utf8'));
var pages = JSON.parse(fs.readFileSync('./data/pages.json', 'utf8'));
var custReviews = JSON.parse(fs.readFileSync('./data/custReviews.json', 'utf8'));

/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: "Travlr Getaways", blogs, pages, custReviews});
};

module.exports = {
    index
}