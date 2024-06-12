import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccountLayout from "@/components/Layout/AccountLayout";
import { getUserSession, getUserOrders } from "../../api/site/me";
import {
  paymentMethod,
  paymentStatus,
  deliveryStatus,
  orderStatus
} from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import cls from "classnames";
const limitPerPage = 10;
const Orders = ({ count, rows, page }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [pageCount, setPageCount] = useState(() => page);

  useEffect(() => {
    setPageCount(Math.ceil(count / limitPerPage));
  }, [count]);

  const handlePageClick = ({ selected }) => {
    router.push({
      pathname: "/me/orders",
      query: { page: selected }
    });
  };
  return (
    <AccountLayout title={t("common:user-orders")}>
      <div>
        <h1 className="font-semibold  p-6  text-2xl">
          {t("common:user-orders")}
        </h1>
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <table className="border-collapse table-auto w-full text-sm overflow-hidden">
              <thead>
                <tr>
                  <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-left whitespace-nowrap">
                    {t("order:order-id")}
                  </th>
                  <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-left whitespace-nowrap">
                    {t("order:delivery-date")}
                  </th>

                  <th className="border-b border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-left whitespace-nowrap">
                    {t("order:status")}
                  </th>

                  <th className="border-b  border-slate-200/75 font-medium p-4 py-3 text-slate-500 text-center whitespace-nowrap">
                    {t("order:total")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map(
                    ({
                      id,
                      total,
                      delivery_date,
                      payment_method,
                      payment_status,
                      status
                    }) => {
                      const dDate = new Date(delivery_date).toLocaleDateString(
                        "en-GB"
                      );
                      return (
                        <tr
                          key={id}
                          onClick={() => router.push(`/me/orders/${id}`)}
                          className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="p-4 text-slate-500">
                            {id.toString().padStart(6, "0")}
                          </td>
                          <td className="p-4 text-slate-500">{dDate}</td>

                          <td className="p-4 text-slate-500">
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
      </div>
    </AccountLayout>
  );
};

export const getServerSideProps = async ({ req, res, query, locale }) => {
  let user = await getUserSession(req, res);
  // user = JSON.parse(JSON.stringify(user));

  if (!user?.id) {
    return {
      notFound: true
    };
  }
  const page = query?.page ? Number(query?.page) : 0;
  const { count, rows } = await getUserOrders(user?.id, page, limitPerPage);

  return {
    props: {
      page,
      count,
      rows: JSON.parse(JSON.stringify(rows)),
      ...(await serverSideTranslations(locale, ["common", "me", "order"]))
    }
  };
};

Orders.Layout = Layout;
export default Orders;
