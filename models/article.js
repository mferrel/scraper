var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//the schema is a blueprint to create your collection
//mongoose has a list of properties in the schema
var ArticleSchema = new Schema({
    Headline:{
        type: String,
        required: true
    },
    Summary:{
        type: String
    },
    URL:{
        type: String,
        required: true
    } 
});
//this exports the articles 
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;