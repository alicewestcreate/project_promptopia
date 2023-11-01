import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  /// Here were calling this as a function and passing in an object.

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is requried"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema) // Prompt to equal existing prompt or create a new prompt. 

export default Prompt
