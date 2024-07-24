import React from "react";
import getCategories from "@/actions/get-categories";
import Box from "@/components/Box";
import Container from "@/components/Container";
import FilterContainer from "@/components/filter-container";
import CategoryFilters from "./components/CategoryFilters";
import getWeights from "@/actions/get-weights";
import WeightFilters from "./components/WeightFilters";
import FlavorFilters from "./components/FlavorFilters";
import getFlavors from "@/actions/get-flavors";
import getProducts from "@/actions/get-products";
import PageContent from "./components/page-content";

export const revalidate = 0;

interface MenuPageProps {
  searchParams: {
    weight?: string;
    flavor?: string;
    category?: string;
    isFeatured?: boolean;
  };
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const categories = await getCategories();
  const weights = await getWeights();
  const flavors = await getFlavors();
  const products = await getProducts({
    weight: searchParams?.weight,
    flavor: searchParams?.flavor,
    category: searchParams?.category,
    isFeatured: searchParams?.isFeatured,
  });
  return (
    <Container className="px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 py-12 gap-2">
        <div className="hidden md:block col-span-2 border-r border-gray-100 top-24">
          <FilterContainer>
            <CategoryFilters categories={categories} />
            <WeightFilters weights={weights} />
            <FlavorFilters flavors={flavors} />
          </FilterContainer>
        </div>
        <Box className="col-span-12 md:col-span-10 flex flex-col items-start justify-start">
          <PageContent />
        </Box>
      </div>
    </Container>
  );
};

export default MenuPage;
