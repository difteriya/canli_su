import React, { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import {
  UserIcon,
  ClipboardListIcon,
  ArchiveIcon,
  TranslateIcon,
  DocumentIcon,
  MenuAlt1Icon,
  HomeIcon,
  TagIcon,
  ChatAltIcon,
  ChevronRightIcon,
  ChartPieIcon,
  LogoutIcon,
  XIcon,
  RssIcon
} from "@heroicons/react/solid";

const menu = [
  {
    label: "Ev",
    href: "/admin/dashboard",
    icon: ChartPieIcon
  },
  {
    label: "Sifarişlər",
    href: "/admin/orders",
    icon: ClipboardListIcon
  },
  {
    label: "Müştərilər",
    href: "/admin/users",
    icon: UserIcon
  },
  {
    label: "Məhsullar",
    href: "/admin/products",
    icon: ArchiveIcon
  },
  {
    label: "Kateqoriyalar",
    href: "/admin/categories",
    icon: TagIcon
  },
  {
    label: "Tərcümələr",
    href: "/admin/translation",
    icon: TranslateIcon
  },
  {
    label: "Mesajlar",
    href: "/admin/messages",
    icon: ChatAltIcon
  },
  {
    label: "Bloq",
    href: "/admin/blog",
    icon: RssIcon
  },
  {
    label: "Haqqımızda",
    href: "/admin/cpages/about",
    icon: DocumentIcon
  },
  {
    label: "Slayder",
    href: "/admin/slider"
  },
  {
    label: "Suyun tərkibi",
    href: "/admin/composition"
  }
];

const AdminLayout = ({ children, pageProps }) => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Canlisu.az - Admin</title>
      </Head>
      <div className="bg-gray-50">
        <nav className="bg-white border-b fixed z-30 w-full  h-14 px-3 flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="block md:hidden">
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Overlay className="fixed inset-0 z-10 bg-black bg-opacity-25" />
                      <Popover.Button className="z-20 bg-white text-gray-600 rounded-full relative inline-flex shrink-0 items-center justify-center border-none outline-none w-9 h-9 font-normal">
                        {open ? (
                          <XIcon className="w-6 h-6 " />
                        ) : (
                          <MenuAlt1Icon className="w-6 h-6 " />
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
                            <div className="flex flex-col gap-1">
                              {menu.map(({ href, label }, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    close();
                                    router.push(href);
                                  }}
                                  className={`inline-block text-left hover:border-th-700  hover:text-th-600 rounded-md px-3 py-3 relative transition-all  ${
                                    router.pathname.startsWith(href)
                                      ? " bg-th-600/10  text-th-600  font-semibold"
                                      : ""
                                  }`}
                                >
                                  {label}
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

              <Link href="/admin/dashboard">
                <a className="ml-3 flex justify-center items-center gap-1.5 font-semibold text-lg text-gray-600 active:opacity-50 hover:text-th-600">
                  <img width="24" className="-mt-1" src="/favicon.svg" />
                  <span>Admin</span>
                  <span className="font-medium text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    v1.0
                  </span>
                </a>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link href="/">
                <a className="rounded-md text-sm  px-3 py-2 active:bg-gray-100 hover:text-th-600">
                  Sayta keç
                </a>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center text-sm justify-center gap-2 rounded-md  px-3 py-2 active:bg-gray-100 hover:text-th-600"
              >
                <span>Çıxış et</span>
              </button>
            </div>
          </div>
        </nav>
        <div className="flex overflow-hidden  pt-14">
          <aside className="fixed hidden z-20 h-full bg-white border-r top-0 left-0 pt-14 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75">
            <div className="relative flex-1 flex flex-col min-h-0 pt-0">
              <div className="flex-1 flex space-y-2 flex-col p-3 overflow-y-auto">
                {menu?.map(({ href, label, type, icon: Icon }, i) =>
                  type === "label" ? (
                    <div
                      key={i}
                      className="text-sm text-gray-400 font-medium  px-3 !mt-6 border-b border-gray-200 pb-2"
                    >
                      {label}
                    </div>
                  ) : (
                    <Link href={href} key={i}>
                      <a
                        className={`flex items-center gap-3 text-sm px-3 py-2.5 rounded-lg  group ${
                          router.pathname.startsWith(href)
                            ? " bg-th-600/10  text-th-600  font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {Icon ? (
                          <Icon className="w-5 h-5  opacity-50 transition duration-75" />
                        ) : (
                          <span className="flex items-center justify-center w-5 h-5">
                            &#8226;
                          </span>
                        )}
                        {label}
                      </a>
                    </Link>
                  )
                )}
              </div>
            </div>
          </aside>
          <main className="min-h-screen h-full w-full  relative overflow-y-auto lg:ml-64 p-4">
            {pageProps?.breadcrumbs && (
              <ol className="inline-flex items-center space-x-1 md:space-x-3 mb-4">
                <li className="inline-flex items-center">
                  <Link href="/admin/dashboard">
                    <a className="inline-flex items-center text-sm  text-gray-700 hover:text-gray-900 ">
                      <HomeIcon className="w-4 h-4 mr-2 text-gray-300" />
                      Ev
                    </a>
                  </Link>
                </li>
                {pageProps?.breadcrumbs.map(({ label, href, type }, i) => (
                  <li key={i}>
                    {
                      <div className="flex items-center">
                        <ChevronRightIcon className="w-5 h-5 text-gray-300" />
                        {href ? (
                          <Link href={href}>
                            <a className="text-sm  text-gray-700 hover:text-gray-900 ml-2 ">
                              {label}
                            </a>
                          </Link>
                        ) : (
                          <span className="text-sm  text-gray-500 ml-2 ">
                            {label}
                          </span>
                        )}
                      </div>
                    }
                  </li>
                ))}
              </ol>
            )}

            {children}
          </main>
        </div>
        {/* <footer className="border-t text-center text-sm flex items-center justify-center gap-3 text-gray-500 mt-auto h-14 bg-gray-50">
        <span>© 2022</span>
        <svg
          viewBox="0 0 2 2"
          aria-hidden="true"
          className="w-0.5 fill-current"
        >
          <circle cx="1" cy="1" r="1"></circle>
        </svg>
        <a href="#" className="hover:underline" target="_blank">
          Canlisu.az
        </a>
      </footer> */}
      </div>
    </>
  );
};

export default AdminLayout;
