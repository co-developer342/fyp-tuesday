// import mongoose from "mongoose";

// const attributeSchema = new mongoose.Schema({
//   key: { type: String, required: true },
//   values: [{ type: String, required: true }],
// });

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: mongoose.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     photo: {
//       data: Buffer,
//       contentType: String,
//     },
//     shipping: {
//       type: Boolean,
//     },
//     attributes: [attributeSchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);
import mongoose from "mongoose";
const attributeValueSchema = new mongoose.Schema({
  value: { type: String, required: true },
  price: { type: Number },
});

const attributeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  values: [attributeValueSchema],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true },
    photo: { data: Buffer, contentType: String },
    shipping: { type: Boolean },
    attributes: [attributeSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
