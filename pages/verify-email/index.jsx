import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const VerifyEmail = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-md">
        <Link href="/">
          <a className="flex items-center shrink-0 mb-6 justify-center">
            <Image
              className="hover:opacity-75   cursor-pointer transition-all object-contain object-left duration-200"
              src="/logo.png"
              alt="logo"
              width={160}
              height={40}
            />
          </a>
        </Link>
        <div className="p-10 bg-white shadow-2xl shadow-th-700/10 rounded-xl  flex flex-col items-center justify-center text-center ">
          <Image width={64} height={64} alt="mail" src="/message2.png" />
          <h1 className="text-2xl my-4 font-semibold">
            {t("me:ev-sended-title")}
          </h1>
          <p>{t("me:ev-sended-desc")}</p>

          <Link href="/">
            <a className="text-th-600 mt-6 font-medium text-sm hover:underline">
              {t("common:nav-link-home")}
            </a>
          </Link>
        </div>
        <div className="mt-4 text-sm text-center text-gray-400">
          &copy; 2022 &middot; canlisu.az
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "me"]))
    }
  };
};

export default VerifyEmail;
