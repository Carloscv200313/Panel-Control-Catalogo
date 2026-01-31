'use server'

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';

type UploadResult = {
  secure_url: string;
};

async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || 'catalogo-ilumina',
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve((result as UploadResult).secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createProduct(_prevState: unknown, formData: FormData) {
  try {
    await connectToDatabase();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const categoryName = formData.get('categoryName') as string;
    const imageFile = formData.get('image') as File;

    if (!name || !description || !price || !categoryName) {
      return { message: 'Todos los campos son obligatorios' };
    }

    const slug = generateSlug(name);
    const categorySlug = generateSlug(categoryName);

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (error) {
        console.error('Error uploading image:', error);
        return { message: 'Error al subir la imagen' };
      }
    }

    // Check if slug exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
        return { message: 'Ya existe un producto con este nombre/slug' };
    }

    await Product.create({
      name,
      slug,
      description,
      price,
      images: imageUrl ? [imageUrl] : [],
      category: {
        name: categoryName,
        slug: categorySlug,
      },
      isActive: true,
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Error creating product:', error);
    return { message: 'Error al crear el producto en la base de datos', success: false };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error al eliminar el producto');
  }
}

export async function updateProduct(id: string, _prevState: unknown, formData: FormData) {
    try {
        await connectToDatabase();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const categoryName = formData.get('categoryName') as string;
        const imageFile = formData.get('image') as File;

        const categorySlug = generateSlug(categoryName);
        
        // Prepare update object
        const updateData: any = {
            name,
            description,
            price,
            'category.name': categoryName,
            'category.slug': categorySlug,
        };

        if (imageFile && imageFile.size > 0) {
            const imageUrl = await uploadImage(imageFile);
            updateData.images = [imageUrl];
        }

        await Product.findByIdAndUpdate(id, updateData);
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return { message: 'Error al actualizar el producto', success: false };
    }
}
