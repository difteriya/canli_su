import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLayout from "@/components/Layout/AdminLayout";
import ReactPaginate from "react-paginate";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@heroicons/react/solid";
import { Router, useRouter } from "next/router";
import { getPosts } from "../../api/blog";

const limitPerPage = 10;
const Blog = ({ page, rows, count }) => {
  const router = useRouter();

  const [pageCount, setPageCount] = useState(() => page);

  console.log({ page, rows, count });

  useEffect(() => {
    setPageCount(Math.ceil(count / limitPerPage));
  }, [count]);

  const handlePageClick = ({ selected }) => {
    router.push({
      pathname: "/admin/blog",
      query: { page: selected }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Bloq</h3>
        <div className="flex-shrink-0">
          <Link href="/admin/blog/new">
            <a className="text-sm font-medium bg-th-700 h-10 px-4  flex items-center justify-center gap-2 text-white hover:opacity-75 rounded">
              <PlusIcon className="w-4" />
              <span>Yarat</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr className="border-b border-t border-gray-200/75">
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Şəkil
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Başlıq
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map(({ id, photo, active, blog_langs }) => {
                    const title = blog_langs.find(
                      (l) => l.lang === "az"
                    )?.title;
                    return (
                      <tr
                        key={id}
                        onClick={() => router.push(`/admin/blog/${id}`)}
                        className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {id}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${photo}`}
                              alt={photo}
                              width="100%"
                              height="100%"
                              className="object-contain object-center"
                            />
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {title}
                        </td>

                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {active ? (
                            <span className="bg-green-100 rounded-full text-green-700 text-xs font-medium mr-2 px-2.5 py-1 ">
                              Aktiv
                            </span>
                          ) : (
                            <span className="bg-yellow-100 rounded-full text-yellow-700 text-xs font-medium mr-2 px-2.5 py-1 ">
                              Deaktiv
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-sm text-gray-400 text-center"
                    >
                      Boşdur.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className={`py-4 text-center md:text-right ${
          pageCount > 0 ? "border-t" : ""
        }`}
      >
        <ReactPaginate
          initialPage={page}
          // disableInitialCallback
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
  );
};

export const getServerSideProps = async ({ locale, query }) => {
  const page = query?.page ? Number(query?.page) : 0;
  const { count, rows } = await getPosts(page, limitPerPage);

  return {
    props: {
      count,
      rows: JSON.parse(JSON.stringify(rows)),
      page,
      breadcrumbs: [{ label: "Bloq" }]
    }
  };
};

Blog.Layout = AdminLayout;

export default Blog;
