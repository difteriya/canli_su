import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import slugify from "slugify";
import { useStore } from "@/context/AppContext";

const ProductItem = ({ data, loading = false }) => {
  const { t } = useTranslation();
  const [_, dispatch] = useStore();

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col items-center relative bg-white transition-all   shadow-2xl  shadow-th-700/10 p-4 rounded-xl">
        <div className="flex w-full justify-center items-center mb-6 h-48 bg-gray-200 rounded-md ">
          <svg
            className="w-12 h-12 text-gray-50 "
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-36 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-16 mb-8"></div>
        <div className="h-8 bg-gray-200 rounded-full  w-24 mb-2"></div>
      </div>
    );
  }

  const { id, photo, price, name } = data;
  const productHref = loading
    ? ""
    : `/products/${id}/${slugify(name, {
        replacement: "-",
        lower: true
      })}`;
  const onAddCart = (e) => {
    e.preventDefault();
    dispatch({
      type: "cart:add_item",
      payload: { ...data, quantity: 1, href: productHref }
    });
    toast.success(t("common:product-cart-add-success"));
  };
  return (
    <Link key={id} href={productHref}>
      <a>
        <div className="group relative bg-white transition-all  duration-300  shadow-xl hover:shadow-2xl hover:shadow-th-700/20 shadow-th-700/5 rounded-xl outline-none hover:outline-th-600   p-4">
          <div className="h-52 w-full flex items-center justify-center relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${photo}`}
              alt={name}
              className="object-contain object-center group-hover:opacity-75"
              width={208}
              height={208}
              // quality={85}
            />
          </div>
          <div className="mt-6 text-center">
            <h3 className="font-semibold line-clamp-2 h-12 ">{name}</h3>
            <p className="text-lg font-semibold text-th-600  mb-3">₼{price}</p>
            <button
              onClick={onAddCart}
              className="inline-flex text-xs h-10 mb-2  uppercase tracking-wide font-medium border border-gray-200 rounded-full px-6  hover:text-th-600 hover:border-th-600 active:scale-95  transition-all items-center justify-center gap-3  bg-white"
            >
              {t("common:add-to-cart")}
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductItem;
