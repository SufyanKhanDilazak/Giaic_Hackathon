import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zux4rgpq',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-18',
  token: 'skrb4PMyPDMgpaqr2qVx2gPxXVwtp2VHekCBWygOpVrXRoyuJ5fvbIMzIl78POJRhKh4LVjXUsBkzq9TuSVOlpkvM9LW5vpqGT83QPQkftL35tEFZQOgNOk1CarktAJ7LDxSoSUt1KEkDeLkeu9VQeJxCa9kAMIzwxnRdCmnUkJ9Es4MLxjH'
});

async function deleteAllProducts() {
  try {
    // First, find all products and their references
    const productsWithRefs = await client.fetch(`
      *[_type == "products"] {
        _id,
        "references": *[references(^._id)]{ _id, _type }
      }
    `);
    
    console.log(`Found ${productsWithRefs.length} products to process`);

    // Process each product
    for (const product of productsWithRefs) {
      try {
        // First delete all references to this product
        if (product.references && product.references.length > 0) {
          console.log(`Removing ${product.references.length} references to product ${product._id}`);
          
          for (const ref of product.references) {
            await client
              .patch(ref._id)
              .unset(['products']) // Unset the reference field
              .commit();
            console.log(`Removed reference from document ${ref._id}`);
          }
        }

        // Now delete the product itself
        await client.delete(product._id);
        console.log(`Deleted product: ${product._id}`);
      } catch (error) {
        console.error(`Error processing product ${product._id}:`, error.message);
        continue; // Continue with next product even if one fails
      }
    }

    console.log('All products processed successfully');
  } catch (error) {
    console.error('Error deleting products:', error);
    if (error.response) {
      console.error('Response error details:', error.response.body.error);
    }
  }
}

// Add "type": "module" to package.json or save with .mjs extension
deleteAllProducts();