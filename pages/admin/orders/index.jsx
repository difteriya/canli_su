import { useState, useEffect } from "react";
import Link from "next/link";
import cls from "classnames";
import AdminLayout from "@/components/Layout/AdminLayout";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@heroicons/react/solid";
import { Router, useRouter } from "next/router";
import { getOrders } from "../../api/orders";
import ReactPaginate from "react-paginate";
import { orderStatus, deliveryStatus } from "@/lib/constants";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const limitPerPage = 10;
const Orders = ({ page, rows, count }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [pageCount, setPageCount] = useState(() => page);
  const [visisbleSearch, setVisisbleSearch] = useState(false);

  console.log({ page, rows, count });

  useEffect(() => {
    setPageCount(Math.ceil(count / limitPerPage));
  }, [count]);

  const handlePageClick = ({ selected }) => {
    router.push({
      pathname: "/admin/orders",
      query: { page: selected }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Sifarişlər</h3>
        {/* <div className="flex-shrink-0">
          <Link href="/admin/orders/new">
            <a className="text-sm font-medium bg-th-700 h-10 px-4  flex items-center justify-center gap-2 text-white hover:opacity-75 rounded">
              <PlusIcon className="w-4" />
              <span>Yarat</span>
            </a>
          </Link>
        </div> */}
      </div>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <table className="border-collapse table-auto w-full text-sm overflow-hidden">
            <thead>
              <tr className="border-t">
                <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-left whitespace-nowrap">
                  ID
                </th>
                <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-center whitespace-nowrap">
                  İstifadəçi İD
                </th>
                <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-left whitespace-nowrap">
                  Alıcı
                </th>
                <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-center whitespace-nowrap">
                  Çatdırılma tarixi
                </th>

                <th className="border-b border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-center whitespace-nowrap">
                  Status
                </th>

                <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-center whitespace-nowrap">
                  Ümumi
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map(
                  ({
                    id,
                    user_id,
                    first_name,
                    last_name,
                    total,
                    delivery_date,
                    status,
                    delivery_status
                  }) => {
                    const dDate = new Date(delivery_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                      }
                    );
                    return (
                      <tr
                        key={id}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/admin/orders/${id}/view`);
                        }}
                        className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="p-4 text-slate-500">
                          {id.toString().padStart(6, "0")}
                        </td>
                        <td className="p-4 text-slate-500 text-center">
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/admin/users/${user_id}`);
                            }}
                            className="px-2 py-1 rounded-lg hover:bg-th-600/10 text-th-600 font-semibold"
                          >
                            {user_id}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">
                          {first_name} {last_name}
                        </td>
                        <td className="p-4 text-slate-500 text-center">
                          {dDate}
                        </td>

                        <td className="p-4 text-slate-500  text-center">
                          <span
                            className={cls(
                              "rounded-full  text-xs font-medium mr-2 px-2.5 py-1",
                              status === 0 && "bg-blue-50 text-blue-600",
                              status === 1 && "bg-green-100 text-green-700",
                              status === 2 && "bg-red-100 text-red-700"
                            )}
                          >
                            {t(orderStatus[status])}
                          </span>
                        </td>

                        <td className="p-4 text-slate-500 text-center">
                          ₼{total}
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    {t("order:empty-orders")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`py-4 text-center md:text-right ${
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
      {/* <Drawer title="Search" visible={visisbleSearch} onClose={onSearchClose}>
        <div>adasd</div>
      </Drawer> */}
    </div>
  );
};

export const getServerSideProps = async ({ locale, query }) => {
  const page = query?.page ? Number(query?.page) : 0;
  const { count, rows } = await getOrders(page, limitPerPage);

  return {
    props: {
      count,
      rows: JSON.parse(JSON.stringify(rows)),
      page,
      breadcrumbs: [{ label: "Sifarişlər" }],
      ...(await serverSideTranslations(locale, ["order"]))
    }
  };
};

Orders.Layout = AdminLayout;

export default Orders;
