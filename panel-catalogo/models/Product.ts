import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: {
      name: { type: String, required: true },
      slug: { type: String, required: true },
    },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

// Indexes (optional if already created on DB)
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });

const Product = models.Product || model('Product', ProductSchema);

export default Product;
