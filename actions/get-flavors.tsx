import { Flavor } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/flavors`;

const getFlavors = async (): Promise<Flavor[]> => {
  const response = await fetch(URL);

  return response.json();
};

export default getFlavors;
