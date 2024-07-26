import { Weight } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/weights`;

const getWeights = async (): Promise<Weight[]> => {
  const response = await fetch(URL);

  return response.json();
};

export default getWeights;
