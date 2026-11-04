import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  order: [{
    id: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    discountPrice: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  }],
  date: {
    type: Date,
    default: new Date()
  },
  address:
  {
    type: String,
    required: true
  },
  pinCode:
  {
    type: String,
    required: true
  },
  deliveryType:
  {
    type: String,
    required: true
  },
  orderStage:{
    type: Number,
    default: 1,
    min:1,
    max:4

  },
  feedback:{
    type: String,
    default: ''
  },
  rating:{
    type: Number,
    default: 0
  }
  
});

const Order = mongoose.model('Order', orderSchema);

export default Order;


