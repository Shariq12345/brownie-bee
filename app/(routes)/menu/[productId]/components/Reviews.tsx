"use client";

import axios from "axios";
import React, { useState } from "react";
import { Review } from "@/types";
import { Star, User } from "lucide-react";

interface ReviewsProps {
  reviews: Review[];
  productId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, productId }) => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleWriteReviewClick = () => {
    setIsWritingReview(true);
  };

  const handleRatingChange = (index: number) => {
    setRating(index + 1);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting review:", { rating, comment });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Review submitted successfully:", response.data);
      // Optionally, add the new review to the local state to update the UI immediately
    } catch (error: Error | any) {
      console.error(
        "Error submitting review:",
        error.response?.data || error.message || error
      );
    }
    setIsWritingReview(false);
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500 italic">
          No reviews yet. Be the first to review our delicious cakes!
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-pink-100 rounded-full p-2 mr-3">
                    <User size={16} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Cake Enthusiast</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                      <span className="ml-2 text-xs text-gray-500">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">2 days ago</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        {isWritingReview ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={`cursor-pointer ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < rating ? "currentColor" : "none"}
                    onClick={() => handleRatingChange(i)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50"
                rows={4}
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setIsWritingReview(false)}
              >
                Cancel
              </button>
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={handleSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        ) : (
          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
            onClick={handleWriteReviewClick}
          >
            Write a Review
          </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
