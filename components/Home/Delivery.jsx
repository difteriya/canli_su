import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const Delivery = () => {
  const { t } = useTranslation();
  return (
    <section
      id="delivery"
      className="py-10 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-screen-lg mx-auto  px-4">
        <div className="flex items-center justify-center gap-6">
          <div className="flex-1 pl-6">
            <h2 className="font-extrabold text-3xl md:text-5xl text-th-700">
              <span className="text-th-600 pr-2">
                {t("home:delivery-title-1")}
              </span>
              {t("home:delivery-title-2")}
            </h2>
            <h5 className="mt-6 mb-6">{t("home:delivery-subtitle")}</h5>

            <ul>
              <li className="mt-4 flex items-center gap-4">
                <span className="w-6 h-6 flex items-center justify-center bg-th-600/30 text-th-800 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    />
                  </svg>
                </span>
                <span>{t("home:delivery-list-1")}</span>
              </li>
              <li className="mt-4 flex items-center gap-4">
                <span className="w-6 h-6 flex items-center justify-center bg-th-600/30 text-th-800 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    />
                  </svg>
                </span>
                <span>{t("home:delivery-list-2")}</span>
              </li>
              <li className="mt-4 flex items-center gap-4">
                <span className="w-6 h-6 flex items-center justify-center bg-th-600/30 text-th-800 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    />
                  </svg>
                </span>
                <span>{t("home:delivery-list-3")}</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 h-[450px] relative hidden md:block">
            <Image
              layout="fill"
              className="object-contain object-center"
              src="/delivery_1.png"
              alt="delivery"
            />
          </div>
        </div>
        <div className="flex items-center  bg-gradient-to-b from-th-600/10 to-white py-10 rounded-2xl mt-10">
          <div className="flex-1">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-th-600">
                {t("home:delivery-stats-1-value")}
              </div>
              <div className="text-th-700 text-sm md:text-base uppercase font-semibold mt-4">
                {t("home:delivery-stats-1-title")}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-th-600">
                {t("home:delivery-stats-2-value")}
              </div>
              <div className="text-th-700 font-semibold text-sm md:text-base uppercase mt-4">
                {t("home:delivery-stats-2-title")}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-th-600">
                {t("home:delivery-stats-3-value")}
              </div>
              <div className="text-th-700 font-semibold text-sm md:text-base uppercase mt-4">
                {t("home:delivery-stats-3-title")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
