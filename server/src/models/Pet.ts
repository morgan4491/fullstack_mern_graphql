import mongoose from "mongoose";

const { Schema, model } = mongoose;

const petSchema = new Schema({
    name: {
        type: String,
        minLength: [2, 'Your pet name must be at least 2 characters in length']
    },
    type: {
        type: String,
        required: [true, 'You must provide the animal\'s type']
    },
    age: {
        type: Number,
        required: [true, 'You must provide the animal\'s age']
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attach the owner user _id'],
        ref: 'User'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const Pet = model('Pet', petSchema);

export default Pet;