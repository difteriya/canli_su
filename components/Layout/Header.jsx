import { Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Menu, Popover, Transition } from "@headlessui/react";
import { languages, menu } from "@/lib/constants";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import {
  ShoppingCartIcon,
  UserIcon,
  MenuAlt1Icon,
  XIcon
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { LoadingIcon } from "./Loading";
import is from "@/lib/is";

import { useStore } from "@/context/AppContext";

import { userMenu } from "../Layout/AccountLayout";

const Header = () => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  console.log("state", state);
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  console.log("state", state);

  const isAuth = status === "authenticated";
  const isLoading = status === "loading";
  const isAdmin = !!session?.user?.isAdmin;

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  const changeLanguage = (nextLocale) => {
    const { pathname, asPath, query } = router;
    // change just the locale and maintain all other route information including href's query
    router.push({ pathname, query }, asPath, { locale: nextLocale });

    document
      .querySelector("html")
      .setAttribute("dir", nextLocale === "ar" ? "rtl" : "ltr");
  };

  const cartCount = Object.keys(state.cart.items).length > 0;

  return (
    <header
      className={`fixed w-full top-0 left-0 z-20 h-16 bg-white shadow-lg shadow-th-700/5`}
    >
      <div className="container max-w-screen-lg mx-auto px-4 h-full">
        <div className="flex items-center h-full w-full gap-4">
          <div className="block md:hidden">
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Overlay className="fixed inset-0 z-10 bg-black bg-opacity-25" />
                  <Popover.Button className="inline-flex relative bg-white z-20 rounded-full shrink-0 items-center justify-center border-none outline-none w-9 h-9 font-normal">
                    {open ? (
                      <XIcon className="w-6 h-6" />
                    ) : (
                      <MenuAlt1Icon className="w-6 h-6" />
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute inset-x-0 z-20 top-full -mt-1 font-medium flex origin-top flex-col rounded-2xl bg-white p-4 tracking-tight text-slate-900 shadow-xl  ring-1 ring-slate-900/5 opacity-100 scale-100">
                      {({ close }) => (
                        <div className="flex flex-col gap-2">
                          {menu.map(({ href, label }, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                close();
                                router.push(href);
                              }}
                              className="inline-block text-left hover:border-th-700  hover:text-th-600 rounded-full px-3 py-2 relative transition-all"
                            >
                              {t(label)}
                            </button>
                          ))}
                        </div>
                      )}
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <Link href="/">
            <a className="flex items-center justify-center">
              <Image
                className="hover:opacity-75   cursor-pointer transition-all object-contain object-left duration-200"
                src="/logo.png"
                alt="logo"
                width={160}
                height={40}
              />
            </a>
          </Link>
          <div className="hidden md:flex  items-center gap-1 uppercase text-sm font-medium">
            {menu.map(({ href, label }, i) => (
              <Link key={i} href={href}>
                <a className="inline-block hover:border-th-700  hover:text-th-600 rounded-full px-2.5 py-2 relative transition-all">
                  {t(label)}
                </a>
              </Link>
            ))}
          </div>
          <div className="ml-auto flex shrink-0  items-center gap-2">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex shrink-0 hover:opacity-75 justify-center items-center gap-1 w-full h-9 border active:bg-gray-100 rounded-full  px-1.5 text-sm font-medium text-white  focus:outline-none ">
                <Image
                  src={`/${router?.locale}.png`}
                  width={24}
                  height={24}
                  alt="lang"
                />
                <ChevronDownIcon
                  className=" h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40  bd ring-opacity-5  origin-top-right divide-y divide-gray-100 rounded-md bg-white focus:outline-none">
                  <div className="py-1">
                    {languages?.map((item, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <button
                            onClick={() => changeLanguage(item.value)}
                            className={`${
                              active ? "bg-blue-50 " : "text-gray-900"
                            } group flex   w-full items-center gap-2 px-3 py-2.5 text-sm`}
                          >
                            <div className="!shrink-0 flex items-center justify-center">
                              <Image
                                src={`/${item.value}.png`}
                                width={20}
                                height={20}
                                alt="lang"
                              />
                            </div>
                            {item.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {isAuth ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="focus:outline-none shrink-0 ">
                  <div className="inline-flex  md:hidden select-none hover:opacity-75  w-9 h-9  items-center justify-center rounded-full  cursor-pointer active:bg-gray-100 ">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="hidden md:inline-flex shrink-0  justify-center items-center hover:opacity-75 gap-1.5 px-1 h-9 rounded  text-sm font-medium  ">
                    <div className="border  text-th-600 font-bold  text-base   w-9 h-9 rounded-full flex items-center justify-center ">
                      {session?.user?.name?.[0]}
                    </div>
                    <span className="hidden lg:block">
                      {session?.user?.name}
                    </span>
                    <ChevronDownIcon
                      className="hidden lg:block h-4 w-4 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48  bd ring-opacity-5  origin-top-right divide-y divide-gray-100 rounded-md bg-white focus:outline-none">
                    <div className="py-1">
                      {userMenu?.map(({ href, label }, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <button
                              onClick={() => router.push(href)}
                              className={`${
                                active ? "bg-gray-100/75 " : ""
                              } group flex  w-full items-center gap-2 px-4 py-2 text-sm`}
                            >
                              {t(label)}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                    {isAdmin && (
                      <div className="py-1">
                        <Menu.Item key={"admin"}>
                          {({ active }) => (
                            <button
                              onClick={() => router.push("/admin/dashboard")}
                              className={`${
                                active ? "bg-gray-100/75 " : ""
                              } group flex  text-th-600  w-full items-center gap-2 px-4 py-2 text-sm`}
                            >
                              {t("common:admin-panel")}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    )}

                    <div className="py-1">
                      <Menu.Item key={"logout"}>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={`${
                              active ? "bg-gray-100/75  " : ""
                            } group flex   w-full items-center gap-2 px-4 py-2 text-sm`}
                          >
                            {t("common:user-logout")}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : isLoading ? (
              <a className="inline-flex w-9 h-9  items-center justify-center">
                <LoadingIcon className="animate-spin  h-5 w-5 text-th-600 " />
              </a>
            ) : (
              <Link href="/auth/login">
                <a className="btn btn-primary rounded-full px-3 h-9 font-semibold text-sm shadow-none">
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden md:block">Giriş</span>
                </a>
              </Link>
            )}

            <button
              onClick={() => dispatch({ type: "cart:open_modal" })}
              className=" relative select-none shrink-0 hover:opacity-75  w-9 h-9 flex items-center justify-center rounded-full  cursor-pointer active:bg-gray-100 "
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount ? (
                <span className="flex h-2 w-2 absolute top-[7px] right-[7px]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-th-600 opacity-75"></span>
                  <span className=" inline-flex rounded-full h-2 w-2 bg-th-600 opacity-75"></span>
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
