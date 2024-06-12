import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "@/components/Layout/AdminLayout";
import { getOrderActivity } from "../../../api/orders/[id]";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const OrderForm = ({ orderActivity }) => {
  const router = useRouter();

  const id = router.query?.id;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between  mb-6">
        <h1 className="font-semibold text-xl">Tarixçə</h1>
      </div>

      <ol className="relative border-l border-gray-200  space-y-6">
        {orderActivity && orderActivity.length > 0 ? (
          orderActivity.map(({ id, user, note, msg, createdAt }) => {
            const dDate = new Date(createdAt).toLocaleDateString("en-GB");
            return (
              <li key={id} className="ml-6">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white "></div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm ">
                  <div className="justify-between items-center bg-white rounded-lg  sm:flex">
                    <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                      {dDate}
                    </time>
                    <div className="text-sm font-normal text-gray-500 ">
                      <Link href={`/admin/users/${user.id}`}>
                        <a className="font-semibold text-blue-600  hover:underline">
                          {user.first_name} {user.last_name}
                        </a>
                      </Link>{" "}
                      tərəfindən {msg}
                    </div>
                  </div>
                  {note && (
                    <div className="p-3 mt-3 text-sm italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200 ">
                      {note}
                    </div>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <div className="p-6 text-center text-sm text-gray-500">Boşdur</div>
        )}
      </ol>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const orderActivity = await getOrderActivity(params?.id);
  return {
    props: {
      orderActivity: JSON.parse(JSON.stringify(orderActivity)),
      breadcrumbs: [
        { label: "Sifarişlər", href: "/admin/orders" },
        { label: `ID: ${params.id}`, href: `/admin/orders/${params.id}/view` },
        { label: "Tarixçə" }
      ],
      ...(await serverSideTranslations("az", ["me", "order"]))
    }
  };
};

OrderForm.Layout = AdminLayout;

export default OrderForm;
