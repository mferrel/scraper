function apiRoutes(app) {
    //THIS DISPLAYS SAVED ARTICLES
      //any displaying web pages is ALL get requests
      app.get('/saved', function(req, res){
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