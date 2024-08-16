import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getReviews = async (productId: string): Promise<Review[]> => {
  const response = await fetch(`${URL}/${productId}/reviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

export default getReviews;
