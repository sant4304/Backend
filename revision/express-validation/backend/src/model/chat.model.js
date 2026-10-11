import mongoose from "mongoose";

const chatShecema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "New Chat"
    }
}
    , {
        timestamps: true
    }

)

const chatModel = mongoose.model("Chat", chatShecema);

export default chatModel;