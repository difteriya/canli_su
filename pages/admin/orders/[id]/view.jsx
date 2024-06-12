import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/Layout/AdminLayout";
import { PencilIcon, TruckIcon } from "@heroicons/react/solid";
import { Activity } from "react-feather";
import cls from "classnames";
import { Router, useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import {
  paymentMethod,
  paymentStatus,
  deliveryStatus,
  orderStatus
} from "@/lib/constants";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getOrderById } from "../../../api/orders/[id]";
import OrderStatusModal from "@/components/OrderStatusModal";
import { useSession } from "next-auth/react";

const Orders = ({ orderData }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  const [order, setOrder] = useState(() => orderData);

  const [visibleStatusModal, setVisibleStatusModal] = useState(false);
  const onCloseStatusModal = () => {
    setVisibleStatusModal(false);
  };

  if (!order) return null;

  const dDate = new Date(order?.delivery_date).toLocaleDateString("en-GB");
  const oDate = new Date(order?.createdAt).toLocaleString("en-GB");

  const id = router.query.id;
  const userId = session?.user?.id;

  const statusModalData = {
    status: order.status,
    payment_status: order.payment_status,
    delivery_status: order.delivery_status,
    payment_method: order.payment_method
  };

  const onSubmitStatusModal = async (values) => {
    if (userId && id) {
      const dc = values.delivery_status != order.delivery_status;
      const pc = values.payment_status != order.payment_status;
      const oc = values.status != order.status;

      const msg = `status dəyişildi: ${
        dc
          ? `Çatdırılma statusu → ${t(deliveryStatus[values.delivery_status])}`
          : ""
      }${
        pc
          ? `, Ödəniş statusu → ${t(paymentStatus[values.payment_status])}`
          : ""
      }${oc ? `, Sifariş statusu → ${t(orderStatus[values.status])}` : ""}`;

      if (pc || dc || oc) {
        try {
          const res = await axios.post(
            `/api/orders/${id}?c=changeStatus`,
            { ...values, msg, user_id: userId },
            {
              withCredentials: true
            }
          );
          if (res.status === 200) {
            toast.success("Yadda saxlanildi");
            setOrder((prev) => ({ ...prev, ...values }));
            // router.push("/admin/products");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-10">
        <h1 className="font-semibold  text-xl">
          {t("order:order-id")}: {order.id.toString().padStart(6, "0")}
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
        <div className="ml-auto flex  gap-3 ">
          {order.status == 0 && (
            <>
              <Link href={`/admin/orders/${id}`}>
                <a className="h-10 px-4 hover:border-gray-300 flex items-center justify-center gap-2 text-sm font-medium shadow-sm border bg-white transition-colors rounded">
                  <PencilIcon className="w-4 h-4 text-gray-400" />
                  <span>Dəyiş</span>
                </a>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVisibleStatusModal(true);
                }}
                className="h-10 px-4 hover:border-gray-300 flex items-center justify-center gap-2 text-sm font-medium shadow-sm border bg-white transition-colors rounded"
              >
                <TruckIcon className="w-4 h-4 text-gray-400" />
                <span>Statusu dəyiş</span>
              </button>
            </>
          )}
          <Link href={`/admin/orders/${id}/activity`}>
            <a className="h-10 px-4 hover:border-gray-300 flex items-center justify-center gap-2 text-sm font-medium shadow-sm border bg-white transition-colors rounded">
              <Activity className="w-4 h-4 text-gray-400" />
              <span>Tarixçə</span>
            </a>
          </Link>
        </div>
      </div>

      <OrderStatusModal
        onEnd={onSubmitStatusModal}
        data={statusModalData}
        visible={visibleStatusModal}
        onClose={onCloseStatusModal}
      />
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
        <div className="font-medium text-gray-600 ">Ödəniş:</div>
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
        <div className="font-medium text-gray-600 ">{t("order:receiver")}:</div>
        <div>
          <div>
            {order.first_name} {order.last_name}
          </div>
          <div>{order.phone}</div>
        </div>
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
              <td className="px-3 py-2.5">{product.products_langs[0]?.name}</td>
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
  );
};

export const getServerSideProps = async ({ query }) => {
  const order = await getOrderById(query?.id);

  return {
    props: {
      orderData: JSON.parse(JSON.stringify(order)),
      breadcrumbs: [
        { label: "Sifarişlər", href: "/admin/orders" },
        { label: `ID: ${query.id}` }
      ],
      ...(await serverSideTranslations("az", ["order"]))
    }
  };
};

Orders.Layout = AdminLayout;

export default Orders;
