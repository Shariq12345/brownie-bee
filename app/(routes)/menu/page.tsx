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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
      <Container className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8">
          Our Menu
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="lg:hidden mb-4 w-full sm:w-auto"
              >
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] max-h-[80vh] overflow-y-auto sheet-content-scroll"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <SheetClose asChild>
                  {/* <Button variant="ghost" size="icon">
        <X className="h-4 w-4" />
      </Button> */}
                </SheetClose>
              </div>
              <FilterContainer>
                <CategoryFilters categories={categories} />
                <WeightFilters weights={weights} />
                <FlavorFilters flavors={flavors} />
              </FilterContainer>
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden lg:block w-1/4 xl:w-1/5">
            <div
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24 max-h-screen overflow-y-auto transition-all duration-300 hover:shadow-md filter-container"
              style={{ height: "calc(100vh - 6rem)" }}
            >
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <FilterContainer>
                <CategoryFilters categories={categories} />
                <WeightFilters weights={weights} />
                <FlavorFilters flavors={flavors} />
              </FilterContainer>
            </div>
          </div>

          {/* Product Content */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md">
              <PageContent products={products} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MenuPage;
