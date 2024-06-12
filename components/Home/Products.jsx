import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import ProductItem from "@/components/ProductItem";

const Products = ({ data }) => {
  const { t } = useTranslation();
  return (
    <section className="min-h-[300px] py-10 bg-gradient-to-b to-gray-50 from-white">
      <div className="container max-w-screen-lg mx-auto  px-4">
        <h2 className="font-extrabold text-th-700 text-3xl md:text-4xl text-center">
          {t("home:products-title-1")}
          <span className="text-th-600 pl-3">{t("home:products-title-2")}</span>
        </h2>
        <div className="grid grid-cols-1 px-6 md:px-0  sm:grid-cols-2 md:grid-cols-4 gap-4 mt-14 ">
          {data?.map(({ category, products_langs, ...restProduct }) => {
            return (
              <ProductItem
                key={restProduct.id}
                data={{
                  ...restProduct,
                  name: products_langs.name,
                  category_name: category.category_langs.name
                }}
              />
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/products">
            <a className="inline-flex h-12 font-medium rounded-full px-6 shadow-sm hover:text-th-600 transition-all items-center justify-center gap-3  bg-white">
              <span>{t("home:products-all-products")}</span>
              <ArrowNarrowRightIcon className="w-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
