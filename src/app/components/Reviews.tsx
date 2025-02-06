import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Thanos',
    rating: 5,
    comment: 'Great selection and fast shipping. The fit was perfect!',
  },
  {
    id: 2,
    name: 'Jhon Wick',
    rating: 4,
    comment: 'The fit was perfect!',
  },
  {
    id: 3,
    name: 'Salman Khan',
    rating: 5,
    comment: 'wow grape.',
  },
  {
    id: 4,
    name: 'Sir Zia.',
    rating: 5,
    comment: 'Wah Beta Very Nice.',
  },
  {
    id: 5,
    name: 'Farhan',
    rating: 5,
    comment: 'Nice Quality.',
  },
  {
    id: 6,
    name: 'Raju.',
    rating: 5,
    comment: 'Oye Hoye hoye hoye hoye maza agaya bhai .',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-black text-center mb-8">CUSTOMER REVIEWS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}