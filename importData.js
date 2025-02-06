import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zux4rgpq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-18',
  token: 'skrb4PMyPDMgpaqr2qVx2gPxXVwtp2VHekCBWygOpVrXRoyuJ5fvbIMzIl78POJRhKh4LVjXUsBkzq9TuSVOlpkvM9LW5vpqGT83QPQkftL35tEFZQOgNOk1CarktAJ7LDxSoSUt1KEkDeLkeu9VQeJxCa9kAMIzwxnRdCmnUkJ9Es4MLxjH',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function uploadProduct(product) {
  try {
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: 'products', // Changed from 'product' to 'products'
        name: product.name,
        description: product.description,
        price: product.price,
        image: {
          _type: 'image',
          asset: {
            _ref: imageId,
          },
        },
        category: product.category,
        discountPercent: product.discountPercent,
        new: product.isNew, // Changed from isNew to new to match schema
        colors: [], // Added default empty array for colors
        sizes: []  // Added default empty array for sizes
      };

      const createdProduct = await client.create(document);
      console.log(`Product ${product.name} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product ${product.name} skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', error);
  }
}

async function importProducts() {
  try {
    const response = await fetch('https://template1-neon-nu.vercel.app/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    for (const product of products) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

importProducts();