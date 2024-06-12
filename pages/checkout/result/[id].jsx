import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Check } from "react-feather";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Result = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = router?.query?.id;
  return (
    <div className=" px-6 py-8 max-w-xl mt-14 mx-auto  bg-white md:shadow-2xl md:shadow-th-700/10 rounded-xl">
      <div className="flex items-center justify-center mb-6">
        <div className=" bg-green-100 flex justify-center items-center w-16 h-16 rounded-full ">
          <Check size={48} className="text-green-500" />
        </div>
      </div>

      <h1 className="text-xl mb-3 font-medium">{t("order:thks-purchase")}</h1>
      <p className="mb-2">
        {t("order:order-id")}:
        <Link href={`/me/orders/${id}`}>
          <a className="ml-2 font-semibold underline hover:text-th-600">
            {id.toString().padStart(6, "0")}
          </a>
        </Link>
      </p>
      <p className="text-gray-500">{t("order:purchase-desc")}</p>
      <div className="mt-6 flex gap-6">
        <Link href="/me/orders">
          <a className="flex  disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white hover:bg-th-700/80">
            {t("common:user-orders")}
          </a>
        </Link>
        <Link href="/">
          <a className="flex disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-gray-300 bg-white px-6 py-3 font-semibold hover:border-th-600 hover:text-th-600 transition-colors">
            {t("common:nav-link-home")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"]))
    }
  };
};

export default Result;
