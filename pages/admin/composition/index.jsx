import React from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLayout from "@/components/Layout/AdminLayout";

import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Router, useRouter } from "next/router";

const CompositionPage = ({ composition }) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow rounded-lg  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Suyun Tərkibi</h3>
        <div className="flex-shrink-0">
          <Link href="/admin/composition/new">
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
                    Adı
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Simvolu
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Miqdarı
                  </th>
                </tr>
              </thead>
              <tbody>
                {composition.map(({ id, composition_langs }) => {
                  const { e_symbol, e_name, e_value } = composition_langs.find(
                    (l) => l.lang === "az"
                  );
                  return (
                    <tr
                      key={id}
                      onClick={() => router.push(`/admin/composition/${id}`)}
                      className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {id}
                      </td>

                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {e_name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {e_symbol}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {e_value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const _res = await fetch(`${process.env.API_PATH}/api/composition`);
  const result = await _res.json();

  return {
    props: {
      composition: result,
      breadcrumbs: [{ label: "Suyun Tərkibi" }]
    }
  };
};

CompositionPage.Layout = AdminLayout;

export default CompositionPage;
