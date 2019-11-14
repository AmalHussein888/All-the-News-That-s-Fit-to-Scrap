var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    
    app.get("/scrape", function(req, res) {
       
        axios.get("https://www.theguardian.com/world/series/eyewitness").then(function(response) {
           
            var $ = cheerio.load(response.data);

           
            $(".fc-container__inner").each(function(i, element) {
    
                var result = {};
                console.log(i);
               
                result.title = $(this).children(".fc-container__body").children(".fc-slice-wrapper").children("ul").children("li").children(".fc-item").children(".fc-item__container").children("a").text();
                result.link = $(this).children(".fc-container__header").children("a").attr("href");
                result.desc = $(this).children(".fc-container__body").children(".fc-slice-wrapper").children("ul").children("li").children(".fc-item").children(".fc-item__container").children(".fc-item__content").children(".fc-item__standfirst").text();
                result.pubDate = $(this).children(".fc-container__header").children("a").children("time").text();
                result.photo = $(this).children(".fc-container__body").children(".fc-slice-wrapper").children("ul").children("li").children(".fc-item").children(".fc-item__container").children(".fc-item__media-wrapper").children(".fc-item__image-container").children("picture").children("source").attr("srcset");
                /("source").currentSrc;
                console.log(result);
                
                db.Article
                    .create(result)
                    .then(function(dbArticle) {
                       
                        res.redirect('/');
                    })
                    .catch(function(err) {
                       
                        res.json(err);
                    });
            }); 
        }); 
        
        
    }); 

    app.get("/clear", function(req, res) {
       
        db.Article
            .remove({})
            .then(function(dbArticle) {
               
                res.redirect('/');
            })
            .catch(function(err) {
             
                res.json(err);
            });
    });

    
    app.get("/articles", function(req, res) {
     
        db.Article
            .find({})
            .then(function(dbArticle) {
                
                res.json(dbArticle);
            })
            .catch(function(err) {
                /
                res.json(err);
            });
    });

    
    app.get("/articles/:id", function(req, res) {
        
        db.Article
            .findOne({ _id: req.params.id })
        
            .populate("note")
            .then(function(dbArticle) {
                
                res.json(dbArticle);
            })
            .catch(function(err) {
          
                res.json(err);
            });
    });

    
    app.post("/articles/:id", function(req, res) {
   
        db.Note
            .create(req.body)
            .then(function(dbNote) {
               
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function(dbArticle) {
                
                res.json(dbArticle);
            })
            .catch(function(err) {
                
                res.json(err);
            });
    });
};