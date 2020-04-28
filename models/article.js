var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//the schema is a blueprint to create your collection
//mongoose has a list of properties in the schema

//the schema builds the collection and the collection must be called by the selector
var ArticleSchema = new Schema({
    headline:{
        type: String,
        required: true
    },
    summary:{
        type: String
    },
    link:{
        type: String,
        required: true
    }, 
    note: [
        {type: Schema.Types.ObjectId,
            ref: "Note"

        }
    ],
    saved: {
        type: Boolean,
        default: false
    }

});
//this exports the articles 
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;