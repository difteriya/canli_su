import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "@/components/Layout/PageHead";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { useStore } from "@/context/AppContext";
import { getProductById } from "../../api/site/products/[id]";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon
} from "react-share";
import Head from "next/head";

const Product = ({ product }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [_, dispatch] = useStore();
  const [qty, setqty] = useState(1);

  const incQty = () => {
    setqty((prev) => prev + 1);
  };
  const decQty = () => {
    setqty((prev) => {
      let c = prev - 1;
      if (c <= 0) c = 1;
      return c;
    });
  };
  const checkQty = (e) => {
    if (e.target.value > 0) {
    } else {
      setqty(1);
    }
  };
  const onQtyChange = (e) => {
    setqty(e.target.value);
  };

  const onAddCart = () => {
    dispatch({
      type: "cart:add_item",
      payload: { ...product, quantity: qty, href: router.asPath }
    });
    setqty(1);
    toast.success(t("common:product-cart-add-success"));
  };

  const shareUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}${router.asPath}`;

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.products_langs.description} />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-4 pb-16 ">
        <PageHead
          light
          data={{
            title: product.name,
            breadcrumbs: [
              { label: t("common:nav-link-products"), href: "/products" },
              { label: product.name }
            ]
          }}
        />
        <div className="mt-4 flex flex-col md:flex-row gap-6  pt-6 ">
          <div className="w-full h-64 md:h-[380px] relative  overflow-hidden  ">
            <Image
                    src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${product.photo}`}
              alt={product.name}
              className="m-auto object-contain object-center block  w-full  group-hover:opacity-75"
              layout="fill"
              // quality={100}
            />
          </div>

          <div className="w-full min">
            <div className="bg-white shadow-2xl shadow-th-700/10 rounded-xl p-6">
              <h1 className="text-3xl font-semibold mt-4">{product.name}</h1>
              <div className="mt-1 text-gray-400">{product.category_name}</div>

              <div className="text-3xl text-th-600 mt-4">₼{product.price}</div>

              <div className="flex  items-center justify-start gap-3 my-6">
                <div className="text-gray-500 text-sm">
                  {t("common:product-quantity")}:{" "}
                </div>
                <div className="text-gray-500  rounded-full gap-0.5 bg-gray-100 p-1  inline-flex items-center justify-center">
                  <button
                    onClick={decQty}
                    className="hover:text-th-700 active:bg-gray-100 bg-white transition-colors rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <input
                    className="appearance-none text-gray-900 text-center focus:border-none p-0  h-8 w-9 border-0 border-gray-200 bg-transparent "
                    value={qty}
                    type="number"
                    onBlur={checkQty}
                    onChange={onQtyChange}
                  />
                  <button
                    onClick={incQty}
                    className="hover:text-th-700 active:bg-gray-100 transition-colors bg-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={onAddCart}
                className="flex w-full transition-all uppercase tracking-widest text-sm font-semibold items-center justify-center rounded border border-transparent bg-th-700 h-12 px-6  text-white shadow-sm hover:bg-th-800 active:scale-95"
              >
                {t("common:add-to-cart")}
              </button>
              <div className="flex items-center justify-start gap-3 mt-6">
                <div className="text-gray-500 text-sm">
                  {t("common:product-share")}:{" "}
                </div>
                <FacebookShareButton url={shareUrl} quote={product.name}>
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={product.name}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
                <TelegramShareButton url={shareUrl} title={product.name}>
                  <TelegramIcon size={24} round />
                </TelegramShareButton>
                <WhatsappShareButton url={shareUrl} title={product.name}>
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
          <h2 className="font-semibold border-l-4 border-th-600 pl-4">
            {t("common:product-description")}
          </h2>
          <div className="bg-white shadow-2xl shadow-th-700/10 rounded-xl p-6 prose w-full max-w-full">
            {product.products_langs.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale, query }) {
  const id = Number(query?.id);
  const product = await getProductById(id, locale);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: { product, ...(await serverSideTranslations(locale, ["common"])) }
  };
}

Product.Layout = Layout;
export default Product;
