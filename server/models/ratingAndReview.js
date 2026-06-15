const mongoose = require("mongoose")

const ratingAndReviewSchema = new mongoose.Schema({
    use:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "user",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("ratingAndReview", ratingAndReviewSchema);