var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");

function apiRoutes(app) {

    //DISPLAY ALL SCRAPED ARTICLES ON THE HOME SCREEN
    app.get("/", function (req, res) {

        // Grab every document in the Articles collection
        db.Article.find({}).sort({date: -1})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client

                var newArticles = []

                for (let index = 0; index < dbArticle.length; index++) {
                    newArticles.push({
                        headline: dbArticle[index].headline,
                        summary: dbArticle[index].summary,
                        link: dbArticle[index].link,
                        _id: dbArticle[index]._id
                    })

                }

                res.render("index", { articles: newArticles });
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    //the colon before makes the id a variable
    //THIS SETS THE SAVED PROPERTY TO TRUE
    app.put("/api/articles/:id", (req, res) => {
        //the update happens when you call this selector
        var id = req.params.id;
        db.Article.update({
            _id: id
        }, {
            saved: true
        }).then(dbArticle => {
            res.json(dbArticle);
        })

    })

    app.get("/api/savedarticles", (req, res) => {
        db.Article.find({
            saved: true
        }).then(dbArticle => {
            res.json(dbArticle);
        })
    })

    //THIS DISPLAYS SAVED ARTICLES
    //any displaying web pages is ALL get requests
    app.get('/saved', function (req, res) {
        db.Article.find({
            saved: true
        }).then(dbArticle => {

            var newArticles = []

            for (let index = 0; index < dbArticle.length; index++) {
                newArticles.push({
                    headline: dbArticle[index].headline,
                    summary: dbArticle[index].summary,
                    link: dbArticle[index].link,
                    _id: dbArticle[index]._id
                })

            }

            res.render("saved", {
                savedArticles: newArticles
            })
        })
    })

    //CREATE A NOTE
    app.post("/api/create/notes/:id", function (req, res) {
        console.log(req.body);

        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });

    });
    // DELETE A NOTE
    app.delete("/api/delete/notes/:id", function (req, res) {

        db.Note.remove(
            { _id: req.params.id }
        )
            .then(function (result) {
                res.json(result)
            })

    });

    //this is your delete route
    app.delete("/api/clearArticles", (req, res) => {
        db.Article.remove({}).then(results => {
            console.log("articles removed");
            //if you don't respond back the client is just waiting there forever
            res.json(results);
        });
    });

    //get is for read, delete is just delete
    app.get("/scrape", (req, res) => {
        console.log("static text");

        axios.get("https://www.buzzfeed.com").then(function (response) {

        db.Article.remove({}).then(results => {
            console.log("success!!")
        })

            //cheerio will load the get request, data will returns the article web page
            var $ = cheerio.load(response.data);
            $("div.xs-px05").each(function (i, element) {
                // create new empty result object
                var result = {};
                // h2 and p are tags that are within the div tag, hence children
                result.headline = $(this).children("h2").text();
                result.summary = $(this).children("p").text();
                //a is the child of h2 is the child of div hence 2 children
                result.link = $(this).children("h2").children("a").attr("href");
                console.log(result.headline, result.summary, result.link);
                // var title = $(this).contents();
                // console.log(title);
                // // also try $("div").each
                //create new Aricle using the 'result' object we just scraped together
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
            res.send("scrape completed!");
        });
    });
};
module.exports = apiRoutes;

