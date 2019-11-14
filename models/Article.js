var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: false
  },
  
  link: {
    type: String,
    required: false
  },
  desc: {
    type: String,
    required: false
  },
  pubDate: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});


var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;