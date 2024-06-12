import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Error401 = () => {
  const { t } = useTranslation();
  return (
    <div className="py-14 px-6 flex flex-col items-center justify-center ">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-8xl dark:text-gray-600">
          <span className="sr-only">Error</span>401
        </h2>
        <p className="text-2xl font-semibold ">
          {t("common:unauthorized-title")}
        </p>
        <p className="mt-4 mb-8 dark:text-gray-400">
          {t("common:unauthorized-desc")}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/auth/login">
            <a
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-semibold rounded-md border bg-white shadow-sm "
            >
              {t("common:nav-link-home")}
            </a>
          </Link>
          <Link href="/auth/login">
            <a
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm font-semibold rounded-md  bg-th-600 text-white"
            >
              {t("common:user-login")}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error401;
