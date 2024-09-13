import qs from "query-string";
import { Products } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  category?: string;
  flavor?: string;
  weight?: string;
  search?: string;

  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Products[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      search: query.search,
      weight: query.weight,
      flavor: query.flavor,
      category: query.category,
      isFeatured: query.isFeatured,
    },
  });
  const response = await fetch(url);

  return response.json();
};

export default getProducts;
