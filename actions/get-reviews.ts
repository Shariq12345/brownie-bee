import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

const getReviews = async (productId: string): Promise<Review[]> => {
  const response = await fetch(`${URL}?productId=${productId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

export default getReviews;
