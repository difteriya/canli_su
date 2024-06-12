import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";

import {
  ShoppingCartIcon,
  TrendingUpIcon,
  UserGroupIcon,
  ArrowNarrowUpIcon
} from "@heroicons/react/outline";

import { getDashboard } from "../api/dashboard";

const SalesChart = dynamic(() => import("@/components/Admin/Dashboard/Chart"), {
  ssr: false
});

const Dashboard = ({
  totalOrders,
  sumOrders,
  lastOrders,
  totalUsers,
  lastUsers,
  monthOrders
}) => {

  const monthTotalOrders =
    monthOrders?.reduce((total, curr) => {
      return total + curr.total;
    }, 0) || 0;
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-6 ">
          <div className="flex items-center justify-between gap-5">
            <div className="flex-shrink-0">
              <div className="text-2xl mb-2  sm:text-3xl leading-none font-bold text-gray-900">
                {totalOrders}
              </div>
              <h3 className="text-base font-normal text-gray-500">
                Sifarişlər
              </h3>
            </div>
            <div className="flex w-14 h-14 items-center justify-center  rounded-lg text-green-600 bg-green-100 text-base font-bold">
              <ShoppingCartIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 ">
          <div className="flex items-center justify-between gap-5">
            <div className="flex-shrink-0">
              <div className="text-2xl mb-2  sm:text-3xl leading-none font-bold text-gray-900">
                {totalUsers}
              </div>
              <h3 className="text-base font-normal text-gray-500">
                Müştərilər
              </h3>
            </div>
            <div className="flex w-14 h-14 items-center justify-center  rounded-lg text-blue-600 bg-blue-100 text-base font-bold">
              <UserGroupIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 ">
          <div className="flex items-center justify-between gap-5">
            <div className="flex-shrink-0">
              <div className="text-2xl mb-2  sm:text-3xl leading-none font-bold text-gray-900">
                ₼{sumOrders?.total_sum?.toFixed(2)}
              </div>
              <h3 className="text-base font-normal text-gray-500">Satışlar</h3>
            </div>
            <div className="flex w-14 h-14 items-center justify-center  rounded-lg text-orange-600 bg-orange-100 text-base font-bold">
              <TrendingUpIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white shadow rounded-lg w-full ">
          <div className="flex items-center justify-between mb-4  p-6 ">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                ₼{monthTotalOrders?.toFixed(2)}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Bu ayın satışları
              </h3>
            </div>
            <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              12.5%
              <ArrowNarrowUpIcon className="w-5 h-5" />
            </div>
          </div>
          <SalesChart orders={monthOrders} />
        </div>
        <div className="bg-white shadow rounded-lg w-full">
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Son sifarişlər
            </h3>
            <div className="flex-shrink-0">
              <Link href="/admin/orders">
                <a className="text-sm flex items-center justify-center gap-2 text-th-600 font-medium underline hover:underline rounded-lg">
                  Bütün
                </a>
              </Link>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-t">
                  <th className=" border-slate-200/75 font-medium p-4 py-2.5 text-slate-500 text-left whitespace-nowrap">
                    ID
                  </th>
                  <th className=" border-slate-200/75 font-medium p-4 py-2.5 text-slate-500 text-left whitespace-nowrap">
                    Alıcı
                  </th>
                  <th className=" border-slate-200/75 font-medium p-4 py-2.5 text-slate-500 text-left whitespace-nowrap">
                    Ümumi
                  </th>
                </tr>
              </thead>
              <tbody>
                {lastOrders && lastOrders.length > 0 ? (
                  lastOrders.map(({ id, first_name, last_name, total }) => {
                    return (
                      <tr
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/admin/orders/${id}/view`);
                        }}
                        key={id}
                        className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {id.toString().padStart(6, "0")}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {first_name} {last_name}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          ₼{total}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-gray-300 text-sm py-10"
                    >
                      Sifariş yoxdur
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg w-full">
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Son müştərilər
          </h3>
          <div className="flex-shrink-0">
            <Link href="/admin/users">
              <a className="text-sm flex items-center justify-center gap-2 text-th-600 font-medium underline hover:underline rounded-lg">
                Bütün
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
                    <th className="w-10 px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Id
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Adı
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Ölkə
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastUsers && lastUsers.length > 0 ? (
                    lastUsers.map(
                      ({
                        id,
                        first_name,
                        last_name,
                        email,
                        phone,
                        country
                      }) => {
                        return (
                          <tr
                            key={id}
                            onClick={() => router.push(`/admin/users/${id}`)}
                            className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                          >
                            <td className="p-4  whitespace-nowrap text-sm font-normal text-gray-500">
                              {id}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {first_name} {last_name}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {email}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {phone}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {country}
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td colSpan={10} className="p-4 text-sm  text-gray-400 ">
                        Boşdur
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const {
    totalOrders,
    lastOrders,
    sumOrders,
    monthOrders,
    totalUsers,
    lastUsers
  } = await getDashboard();
  return {
    props: {
      totalOrders,
      totalUsers,
      sumOrders,

      monthOrders: JSON.parse(JSON.stringify(monthOrders)),
      lastUsers: JSON.parse(JSON.stringify(lastUsers)),
      lastOrders: JSON.parse(JSON.stringify(lastOrders))
    },
    revalidate: 600 // In seconds
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
