import { Products } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Products> => {
  const response = await fetch(`${URL}/${id}`);

  return response.json();
};

export default getProduct;
