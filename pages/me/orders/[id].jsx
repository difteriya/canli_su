import Layout from "@/components/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccountLayout from "@/components/Layout/AccountLayout";
import { getUserSession, getUserOrderById } from "../../api/site/me";
import {
  paymentMethod,
  orderStatus,
  deliveryStatus,
  paymentStatus
} from "@/lib/constants";
import cls from "classnames";
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  CheckIcon
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";

const Orders = ({ order }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const dDate = new Date(order?.delivery_date).toLocaleDateString("en-GB");
  const oDate = new Date(order?.createdAt).toLocaleDateString("en-GB");
  console.log(order);

  return (
    <AccountLayout title={t("common:user-orders")}>
      <div className="p-6">
        <div className="flex items-center gap-4 pb-10">
          <Link href="/me/orders">
            <a className="font-semibold text-2xl w-9 h-9 border hover:bg-gray-100 rounded-lg flex items-center justify-center">
              <ChevronLeftIcon className="w-5 h-5" />
            </a>
          </Link>
          <h1 className="font-semibold  text-xl">
            {t("order:order-id")}: {order.id.toString().padStart(6, "0")}{" "}
          </h1>
          <span
            className={cls(
              "rounded-full  text-xs font-medium mr-2 px-2.5 py-1",
              order.status === 0 && "bg-blue-50 text-blue-600",
              order.status === 1 && "bg-green-100 text-green-700",
              order.status === 2 && "bg-red-100 text-red-700"
            )}
          >
            {t(orderStatus[order.status])}
          </span>
        </div>

        <div>
          <div className="overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-1 bg-th-600 rounded-full"
              style={{
                width: `calc(${order.delivery_status * 25}% + ${
                  order.delivery_status === 3 ? 25 : 12.5
                }%)`
              }}
            ></div>
          </div>
          <div className="grid grid-cols-4 mt-3 mb-10 text-sm font-medium text-gray-500">
            <div className="flex items-center justify-start gap-2">
              <div className="">{t(deliveryStatus[0])}</div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="">{t(deliveryStatus[1])}</div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="">{t(deliveryStatus[2])}</div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="">{t(deliveryStatus[3])}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-4 pb-6 text-sm font-medium">
          <div className="font-medium text-gray-600 ">
            {t("order:payment")}:
          </div>
          <div className="flex items-center gap-3">
            <span>{t(paymentMethod[order.payment_method])}</span>
            <span
              className={cls(
                "rounded-full text-xs font-medium mr-2 px-2.5 py-1",
                order.payment_status === 0 && "bg-yellow-100 text-yellow-700",
                order.payment_status === 1 && "bg-green-100 text-green-700",
                order.payment_status > 1 && "bg-red-100 text-red-700"
              )}
            >
              {t(paymentStatus[order.payment_status])}
            </span>
          </div>
          <div className="font-medium text-gray-600 ">
            {t("order:order-date")}:
          </div>
          <div>
            <div>{oDate}</div>
          </div>
          <div className="font-medium text-gray-600 ">
            {t("order:delivery-date")}:
          </div>
          <div>
            <div>{dDate}</div>
          </div>
          <div className="font-medium text-gray-600">
            {t("order:delivery-note")}:
          </div>
          <div>
            <div>{order.delivery_note || "-"}</div>
          </div>
          <div className="font-medium text-gray-600 ">
            {t("order:shipping-address")}:
          </div>
          <div>
            <div>{order.address}</div>
            <div>
              {order.country}, {order.city}
            </div>
          </div>
          <div className="font-medium text-gray-600 ">
            {t("order:receiver")}:
          </div>
          <div>
            <div>
              {order.first_name} {order.last_name}
            </div>
            <div>{order.phone}</div>
          </div>
          <div className="font-medium text-gray-600 ">
            {t("order:payment-method")}:
          </div>
          <div>{t(paymentMethod[order.payment_method])}</div>
        </div>
        <table className="w-full mt-6 rounded-md border ">
          <thead>
            <tr className="border-b">
              <th className="text-sm  px-3 py-2.5 text-gray-600  font-medium text-left">
                {t("order:product-name")}
              </th>
              <th className="text-sm px-3 py-2.5 text-gray-600  font-medium text-center">
                {t("order:price")}
              </th>
              <th className="text-sm px-3 py-2.5 text-gray-600  font-medium text-center">
                {t("order:quantity")}
              </th>
              <th className="text-sm px-3 py-2.5 text-gray-600  font-medium text-center">
                {t("order:total")}
              </th>
            </tr>
          </thead>
          <tbody>
            {order.orders_items.map(({ id, product, quantity, price }) => (
              <tr
                key={id}
                className="border-t border-gray-100 text-sm font-medium"
              >
                <td className="px-3 py-2.5">
                  {product.products_langs[0].name}
                </td>
                <td className="px-3 py-2.5 text-center border-l border-gray-100">
                  ₼{price.toFixed(2)}
                </td>
                <td className="px-3 py-2.5 text-center border-l border-r border-gray-100">
                  {quantity}
                </td>
                <td className="px-3 py-2.5 text-center">
                  ₼{(Number(price) * Number(quantity)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" py-4">
          <div className="flex py-3 text-sm font-medium justify-between border-b gap-4">
            <div>Çatdırılma:</div>
            <div>₼{0}</div>
          </div>
          <div className="flex py-3 justify-between gap-4">
            <div className="font-semibold">{t("order:total")}:</div>
            <div>₼{order.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export const getServerSideProps = async ({ req, res, query, locale }) => {
  let user = await getUserSession(req, res);
  // user = JSON.parse(JSON.stringify(user));
  const orderId = Number(query?.id) || null;
  if (!user?.id || !orderId) {
    return {
      notFound: true
    };
  }

  const order = await getUserOrderById(user?.id, orderId, locale);
  if (!order) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      ...(await serverSideTranslations(locale, ["common", "me", "order"]))
    }
  };
};

Orders.Layout = Layout;
export default Orders;
