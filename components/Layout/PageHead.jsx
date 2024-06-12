import React from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

const PageHead = ({ data, light }) => {
  const { t } = useTranslation();
  const { title, description, breadcrumbs } = data;

  const bc = breadcrumbs && (
    <ol className="inline-flex items-center space-x-1 md:space-x-3 mt-4">
      <li>
        <Link href="/">
          <a className="items-center text-sm    hover:underline hover:text-th-600 ">
            <HomeIcon className="w-4 h-4 text-th-600" />
          </a>
        </Link>
      </li>
      {breadcrumbs.map(({ label, href }, i) => (
        <li key={i}>
          <span className="text-gray-300">/</span>
          {href ? (
            <Link href={href}>
              <a className="text-sm  hover:underline text-th-700 hover:text-th-600  ml-2 ">
                {label}
              </a>
            </Link>
          ) : (
            <span className="text-sm  text-gray-700  ml-2 ">{label}</span>
          )}
        </li>
      ))}
    </ol>
  );
  return (
    <>
      {light ? (
        bc
      ) : (
        <div className="bg-gradient-to-b from-th-600/10 to-th-600/5">
          <div className="py-9 px-4 md:py-11 text-center max-w-screen-md mx-auto ">
            <div>
              <h1 className="gd-text  text-2xl md:text-3xl font-extrabold inline-block">
                {title}
              </h1>
            </div>
            {bc}
          </div>
          <div className="relative h-7 xl:h-14 overflow-hidden">
            <svg viewBox="0 0 1440 125" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M1256 11.76C1237.2 17.26 1209.4 27.56 1170 25.76C1127.2 23.86 1125.3 10.16 1087 7.75998C1026.9 3.95998 1015 36.56 959 29.76C920.1 25.06 921.3 8.85998 884 7.75998C841.3 6.55998 834.4 27.66 790 27.76C749.8 27.86 748.5 10.66 707 9.75998C662.5 8.75998 658.2 28.46 611 31.76C563.1 35.06 560 15.26 504 13.76C452.5 12.36 450 28.96 396 29.76C336.7 30.56 332.6 9.35998 279.1 10.76C216.3 12.36 202.3 40.36 146 43.76C112.8 45.76 63 41.96 0 10.76V124.6H1440V10.76C1353.8 -7.34002 1294.8 0.459979 1256 11.76Z"
                  fill="white"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHead;
