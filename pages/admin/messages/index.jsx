import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  TrashIcon
} from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { getMessages } from "../../api/msg";
import toast from "react-hot-toast";
import axios from "axios";

const limitPerPage = 20;
const CategoryPage = ({ count, rows, page }) => {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(() => page);

  useEffect(() => {
    setPageCount(Math.ceil(count / limitPerPage));
  }, [count]);

  const handlePageClick = ({ selected }) => {
    router.push({
      pathname: "/admin/messages",
      query: { page: selected }
    });
  };

  const handleDelete = async (e, id) => {
    if (window.confirm("Silməyə əminsiniz?")) {
      try {
        const res = await axios.delete(`/api/msg?id=${id}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          setTimeout(() => {
            e.target
              .closest("tr")
              .classList.add("opacity-50", "pointer-events-none");
          }, 200);
          toast.success("Silindi");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Mesajlar</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className=" divide-y divide-gray-200 w-full min-w-[1000px]">
              <thead className="">
                <tr className="border-b border-t border-gray-200/75">
                  <th className="px-4 py-3 text-left w-4 text-xs font-medium  uppercase tracking-wider ">
                    Sil
                  </th>
                  <th className="px-4 py-3 text-left w-48 text-xs font-medium  uppercase tracking-wider ">
                    Tarix
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Adı
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    E-mail
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider max-w-sm">
                    Mesaj
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ id, date_send, message, email, fullname }) => {
                  let d = new Date(date_send);
                  let date = d.toLocaleDateString("en-GB");
                  let time = d.toLocaleTimeString("en-GB");

                  return (
                    <tr
                      key={id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-1 px-3 whitespace-nowrap text-sm font-normal text-gray-500">
                        <button
                          onClick={(e) => handleDelete(e, id)}
                          className="w-8 h-8 hover:text-red-500 hover:bg-red-100 flex items-center justify-center rounded-full transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {`${date}, ${time}`}
                      </td>

                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {fullname}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {email}
                      </td>
                      <td className="p-4  text-sm font-normal text-gray-500">
                        {message}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="p-4 border-t text-right">
        <ReactPaginate
          initialPage={page}
          disableInitialCallback
          breakLabel="..."
          nextLabel={<ArrowNarrowRightIcon className="w-5 h-5" />}
          previousLabel={<ArrowNarrowLeftIcon className="w-5 h-5" />}
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

export const getServerSideProps = async ({ query }) => {
  const page = query?.page ? Number(query?.page) : 0;
  const { count, rows } = await getMessages(page, limitPerPage);

  return {
    props: {
      page,
      count,
      rows: JSON.parse(JSON.stringify(rows)),
      breadcrumbs: [{ label: "Mesajlar" }]
    }
  };
};

CategoryPage.Layout = AdminLayout;

export default CategoryPage;
