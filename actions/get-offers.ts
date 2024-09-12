import { Offers } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/offers`;

const getOffers = async (): Promise<Offers[]> => {
  const response = await fetch(URL);

  return response.json();
};

export default getOffers;
