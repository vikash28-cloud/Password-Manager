const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const passwordSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
});

mongoose.model("PasswordModel", passwordSchema);