import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    categories: { type: [String], default: [], index: true },
    category: {
      name: { type: String },
      slug: { type: String },
    },
    tags: { type: [String], default: [] },
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
