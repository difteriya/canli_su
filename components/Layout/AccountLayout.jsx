import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { MapPin, User, List, LogOut } from "react-feather";
import { useTranslation } from "next-i18next";
import { signOut } from "next-auth/react";
export const userMenu = [
  {
    label: "common:user-profile",
    href: "/me/profile",
    icon: User
  },
  {
    label: "common:user-orders",
    href: "/me/orders",
    icon: List
  },
  {
    label: "common:user-shipping-address",
    href: "/me/shipping-address",
    icon: MapPin
  }
];

const AccountLayout = ({ title, children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="container max-w-screen-lg mx-auto pb-16 md:px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col md:flex-row md:gap-6  md:pt-6 ">
        <div className="flex shrink-0 border-b py-2 md:border-b-0  flex-row md:flex-col gap-2 w-full md:w-56 md:pt-4 px-4 md:px-0 overflow-y-auto md:overflow-hidden scrollbar-hidden  ">
          {userMenu?.map(({ href, label, icon: Icon }, i) => (
            <Link href={href} key={i}>
              <a
                className={` shrink-0 flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md  ${
                  router.pathname.startsWith(href)
                    ? "text-th-600 bg-th-600/10 "
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(label)}
              </a>
            </Link>
          ))}
          <div className=" shrink-0 md:border-t md:pt-3 md:mt-3">
            <button
              onClick={handleSignOut}
              className=" flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-gray-100 w-full rounded-md"
            >
              <LogOut className="w-4 h-4" />
              {t("common:user-logout")}
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className=" bg-white md:shadow-2xl md:shadow-th-700/10 rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
