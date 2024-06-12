import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "@/components/Layout/PageHead";
import { getPostsSite } from "../api/blog";

import ReactPaginate from "react-paginate";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import Head from "next/head";

export const news = [
  {
    id: 1,
    image:
      "https://wavio.b-cdn.net/wp-content/uploads/2020/11/pexels-pixabay-64219-800x533.jpg",
    title: "The average cost for water",
    subtitle:
      "The average cost for water supplied to a home in the U.S. is about $2.00 for 1,000 gallons, which equals about 5 gallons for a penny."
  },
  {
    id: 2,
    image:
      "https://wavio.b-cdn.net/wp-content/uploads/2020/10/damir-spanic-gzdspwIypvw-unsplash-scaled.jpg",
    title: "Cucumbers are 95 percent water",
    subtitle:
      "Cucumbers are 95 percent water, according to Ware. This makes cucumbers a great way to stay hydrated, especially during the summer"
  },

  {
    id: 3,
    image:
      "https://wavio.b-cdn.net/wp-content/uploads/2020/11/pexels-pixabay-53389-scaled.jpg",
    title: "Why ice floats in water?",
    subtitle:
      "Water expands by 9% when it freezes. Frozen water (ice) is lighter than water, which is why ice floats in water."
  },

  {
    id: 4,
    image:
      "https://wavio.b-cdn.net/wp-content/uploads/2020/11/pexels-the-lazy-artist-gallery-1302925-scaled.jpg",
    title: "Most freshwater is in ice",
    subtitle:
      "Just 3.5 percent of Earth’s water is fresh—that is, with few salts in it. You can find Earth’s freshwater in our lakes, rivers, and streams."
  }
];
const limitPerPage = 12;
const BlogPage = ({ page, rows, count }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [pageCount, setPageCount] = useState(() => page);

  console.log({ page, rows, count });

  useEffect(() => {
    setPageCount(Math.ceil(count / limitPerPage));
  }, [count]);

  const handlePageClick = ({ selected }) => {
    router.push({
      pathname: "/blog",
      query: { page: selected }
    });
  };

  return (
    <div>
      <Head>
        <title>{t("common:nav-link-blog")}</title>
      </Head>
      <PageHead
        data={{
          title: t("common:nav-link-blog")
        }}
      />
      <div className="container max-w-screen-lg mx-auto pb-16 mt-4 px-2">
        <div className="grid grid-cols-1 px-6 md:px-0  sm:grid-cols-2 md:grid-cols-3 gap-8">
          {rows?.map(({ id, photo, blog_langs }) => {
            const { title, subtitle, alias } = blog_langs;
            return (
              <Link key={id} href={`/blog/${id}/${alias}`}>
                <a>
                  <div className="group overflow-hidden relative h-full bg-white  transition-all  duration-300  shadow-xl hover:shadow-2xl hover:shadow-th-700/20 shadow-th-700/5 rounded-xl">
                    <div className="h-52 w-full inline-flex items-center justify-center relative">
                      <div className="opacity-0 gap-1 text-sm group-hover:opacity-100  transition-all duration-300 absolute pl-4 pr-3  text-white font-medium bg-black/30 hover:bg-black/50  flex items-center justify-center rounded-full  h-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10">
                        <span>Ətraflı</span>
                        <ChevronRightIcon className="h-5 w-5" />
                      </div>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${photo}`}
                        alt={title}
                        className="object-cover object-center group-hover:scale-110 transition-all duration-300"
                        layout="fill"
                      />
                    </div>
                    <div className="p-6 ">
                      <h3 className="font-semibold text-xl line-clamp-2 mb-3 text-th-700 group-hover:underline underline-offset-4 ">
                        {title}
                      </h3>
                      <p className=" leading-6 text-gray-600 line-clamp-4 text-sm ">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <div
          className={`py-4 mt-10 text-center md:text-right ${
            pageCount > 0 ? "border-t" : ""
          }`}
        >
          <ReactPaginate
            initialPage={page}
            disableInitialCallback
            breakLabel="..."
            nextLabel={<ChevronRightIcon className="w-5 h-5" />}
            previousLabel={<ChevronLeftIcon className="w-5 h-5" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            className="table-paginate"
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale, query }) {
  const page = query?.page ? Number(query?.page) : 0;
  const { count, rows } = await getPostsSite(locale, page, limitPerPage);

  // if (!page) {
  //   return {
  //     notFound: true
  //   };
  // }

  return {
    props: {
      count,
      rows: JSON.parse(JSON.stringify(rows)),
      page,
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };

  return {
    props: { page: "" }
  };
}

BlogPage.Layout = Layout;
export default BlogPage;
