import React from "react";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Container from "@/components/Container";
import Box from "@/components/Box";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Gallery from "./components/gallery/Gallery";
import Info from "./components/info";
import SuggestedProducts from "./components/suggested-products";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    category: product?.category,
  });
  return (
    <div>
      <Container className="bg-white rounded-lg my-4 px-4">
        <Box className="text-neutral-700 text-sm items-center mt-12">
          <Link href={"/"} className="flex items-center gap-2">
            <Home className="size-4" />
            Main Page
          </Link>
          <ChevronRight className="size-5 text-muted-foreground" />
          <Link
            href={"/menu"}
            className="flex items-center gap-2 text-muted-foreground"
          >
            Products
          </Link>
          <ChevronRight className="size-5 text-muted-foreground" />
          <Link
            href={`/menu/${product.category}`}
            className="flex items-center gap-2 text-muted-foreground cursor-default"
          >
            {product.name}
          </Link>
        </Box>

        <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* GALLERY */}
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* INFO */}
              <Info product={product} />
            </div>
          </div>

          <hr className="my-10" />
          <SuggestedProducts products={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
