import React from "react";
import Link from "next/link";
import AdminLayout from "@/components/Layout/AdminLayout";

import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { getUsers } from "../../api/users";

const CategoryPage = ({ users }) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow rounded-lg  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Müştərilər</h3>
        <div className="flex-shrink-0">
          <Link href="/admin/users/new">
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
                {users && users.length > 0 ? (
                  users.map(
                    ({ id, first_name, last_name, email, phone, country }) => {
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
  );
};

export const getServerSideProps = async ({ locale }) => {
  const users = await getUsers();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      breadcrumbs: [{ label: "Müştərilər" }]
    }
  };
};

CategoryPage.Layout = AdminLayout;

export default CategoryPage;
