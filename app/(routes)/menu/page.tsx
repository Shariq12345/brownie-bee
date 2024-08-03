import React from "react";
import getCategories from "@/actions/get-categories";
import Container from "@/components/Container";
import FilterContainer from "@/components/filter-container";
import CategoryFilters from "./components/CategoryFilters";
import WeightFilters from "./components/WeightFilters";
import FlavorFilters from "./components/FlavorFilters";
import getProducts from "@/actions/get-products";
import PageContent from "./components/page-content";
import getFlavors from "@/actions/get-flavors";
import getWeights from "@/actions/get-weights";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <div className="bg-gray-50 min-h-screen">
      <Container className="px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our Menu
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden mb-4">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FilterContainer>
                <CategoryFilters categories={categories} />
                <WeightFilters weights={weights} />
                <FlavorFilters flavors={flavors} />
              </FilterContainer>
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden md:block w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <FilterContainer>
                <CategoryFilters categories={categories} />
                <WeightFilters weights={weights} />
                <FlavorFilters flavors={flavors} />
              </FilterContainer>
            </div>
          </div>

          {/* Product Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white rounded-lg shadow-md p-6">
              <PageContent products={products} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MenuPage;
