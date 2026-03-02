import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Automatically generated unique identifier
  id: Number,
  productName: String,
  mrp: String,
  bogo: Boolean,
  discountPrice: String,
  category: String,
  imageUrl: String,
  ratings: {
    type: [ratingSchema],
    default: [],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Products', productSchema);

export default Product;
