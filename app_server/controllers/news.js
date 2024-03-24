var fs = require('fs');
var newsArticles = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
var latest = JSON.parse(fs.readFileSync('./data/latest.json', 'utf8'));
var vacayTips = JSON.parse(fs.readFileSync('./data/vacayTips.json', 'utf8'));

/* GET news page */
const news = (req, res) => {
    res.render('news', { title: "Travlr Getaways", newsArticles, latest, vacayTips });
};

module.exports = {
    news
}