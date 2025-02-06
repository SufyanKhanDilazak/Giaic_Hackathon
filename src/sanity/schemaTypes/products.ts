import { defineType } from "sanity";

export default defineType({
  name: 'products',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Enable image cropping
      },
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid', // Display images in a grid in the Sanity Studio
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'T-Shirt', value: 'tshirt' },
          { title: 'Short', value: 'short' },
          { title: 'Jeans', value: 'jeans' },
          { title: 'Hoodie', value: 'hoodie' },
          { title: 'Shirt', value: 'shirt' },
        ],
      },
    },
    {
      name: 'discountPercent',
      title: 'Discount Percent',
      type: 'number',
    },
    {
      name: 'new',
      type: 'boolean',
      title: 'New',
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});