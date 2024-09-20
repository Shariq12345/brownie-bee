"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Review } from "@/types";
import { StarIcon, Loader2, TrashIcon, PencilIcon } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(1),
  rating: z.coerce.number().min(0).max(5),
});

type FormValues = z.infer<typeof formSchema>;

interface ReviewsProps {
  productId: string;
  initialReviews: Review[];
}

export const Reviews = ({ productId, initialReviews }: ReviewsProps) => {
  const { isSignedIn, user } = useUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress || "";
  const userName = isSignedIn && user ? user.firstName : "Customer";

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      rating: 0,
    },
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews?productId=${productId}`
        );
        setReviews(response.data);
        if (isSignedIn) {
          const userReview = response.data.find(
            (review: Review) => review.emailAddress === emailAddress
          );
          setHasReviewed(!!userReview);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, isSignedIn, emailAddress]);

  const onSubmit = async (data: FormValues) => {
    setFormLoading(true);
    const dataToSend = {
      ...data,
      userName,
      emailAddress,
      productId,
    };

    try {
      if (editingReview) {
        // Update review
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/${editingReview.id}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create new review
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Fetch updated reviews after submission
      const updatedReviews = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews?productId=${productId}`
      );
      setReviews(updatedReviews.data);
      form.reset();
      setEditingReview(null);
      setHasReviewed(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    form.setValue("content", review.content);
    form.setValue("rating", review.rating);
    setEditingReview(review);
  };

  const handleDelete = async (reviewId: string) => {
    setFormLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`
      );

      // Fetch updated reviews after deletion
      const updatedReviews = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews?productId=${productId}`
      );
      setReviews(updatedReviews.data);
      if (editingReview?.id === reviewId) {
        setEditingReview(null);
        form.reset();
      }
      setHasReviewed(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const renderReviewForm = () => (
    <div className="rounded-lg shadow-lg p-6 bg-white">
      <h3 className="text-xl font-semibold mb-4">
        {editingReview ? "Edit Your Review" : "Write a Review"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Content</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Write your review..."
                    className="border-gray-300 focus:ring-pink-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    max="5"
                    placeholder="0 to 5"
                    className="border-gray-300 focus:ring-pink-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-6 bg-pink-600 text-white hover:bg-pink-700"
            disabled={formLoading}
          >
            {formLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : editingReview ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
          {editingReview && (
            <Button
              type="button"
              className="mt-6 ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400"
              onClick={() => {
                setEditingReview(null);
                form.reset();
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Form>
    </div>
  );

  return (
    <div className={`space-y-6 ${editingReview ? "flex space-x-6" : ""}`}>
      {/* Reviews Section */}
      <div className={`${editingReview ? "w-1/2" : "w-full"} space-y-6`}>
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            </div>
          ) : (
            <div
              className={`${
                reviews.length > 1 ? "max-h-80" : "h-auto"
              } overflow-y-auto`}
            >
              {reviews.length === 0 ? (
                <p className="text-gray-500">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-pink-600">
                        {review.userName}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-5 h-5 ${
                              index < review.rating
                                ? "fill-current"
                                : "stroke-current"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                    {review.emailAddress === emailAddress && (
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={() => handleEdit(review)}
                          className="bg-yellow-500 text-white hover:bg-yellow-600"
                        >
                          <PencilIcon className="size-4" />
                          {/* Edit */}
                        </Button>
                        <Button
                          onClick={() => handleDelete(review.id)}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          <TrashIcon className="size-4" />
                          {/* Delete */}
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      {((!hasReviewed && isSignedIn) || editingReview) && (
        <div className={`${editingReview ? "w-1/2" : "w-full"}`}>
          {renderReviewForm()}
        </div>
      )}
    </div>
  );
};
