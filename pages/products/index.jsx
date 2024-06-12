import { useState } from "react";
import Layout from "@/components/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductItem from "@/components/ProductItem";
import PageHead from "@/components/Layout/PageHead";
import { getProducts } from "../api/site/products";
import Head from "next/head";


const Products = ({ products }) => {

  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t("common:nav-link-products")}</title>
      </Head>
      <PageHead
        data={{
          title: t("common:nav-link-products")
        }}
      />
      <div className="container max-w-screen-lg mx-auto pb-16 mt-4 px-2  ">
        <div className="grid grid-cols-1 px-6 md:px-0  sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(({ category, products_langs, ...restProduct }) => {
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
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  const products = await getProducts(20, locale);

  // if (!products) {
  //   return {
  //     notFound: true
  //   };
  // }

  return {
    props: { products, ...(await serverSideTranslations(locale, ["common"])) }
  };
}

Products.Layout = Layout;
export default Products;
