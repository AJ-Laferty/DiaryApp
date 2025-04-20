import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    reflection: { type: String, trim: true, maxlength: 500 },
    location: { type: String, required: true },
    tags: { type: [String], default: [] },
    weather: {
      condition: { type: String },
      temperature: { type: Number },
      location: { type: String },
    },
  },
  { timestamps: true }
);

const DiaryEntry = mongoose.model("DiaryEntry", diarySchema);

export default DiaryEntry;
