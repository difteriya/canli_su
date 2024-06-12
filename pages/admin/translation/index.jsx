import React from "react";
import Link from "next/link";
import AdminLayout from "@/components/Layout/AdminLayout";
import { translationFiles, languages } from "@/lib/constants";
import toast from "react-hot-toast";
import axios from "axios";

const TranslationPage = () => {
  const handleClick = async () => {
    try {
      const res = await axios.get(`/api/translation?c=reload`, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success("Yenilendi");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg  w-full">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold  text-gray-900">Tərcümələr</h3>
        {/* <button
          className="text-sm font-medium bg-white border shadow-sm h-10 px-4 flex items-center justify-center gap-2  hover:border-gray-300 active:bg-gray-50 transition-colors rounded"
          onClick={handleClick}
        >
          Keşi təmizlə
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr className="border-b border-t border-gray-200/75">
                  <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Adı
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {translationFiles.map(({ label, file }) => {
                  return (
                    <tr key={file} className="border-t border-gray-100">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 w-full">
                        {label}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        <div className="flex gap-1">
                          {languages.map(({ value, label }) => (
                            <Link
                              key={value}
                              href={`/admin/translation/${value}/${file}`}
                            >
                              <a
                                title={label}
                                className="text-th-700 uppercase font-medium hover:bg-th-700/5  h-9 w-9 flex items-center justify-center rounded-full px-2"
                              >
                                {value}
                              </a>
                            </Link>
                          ))}
                        </div>
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
  return {
    props: {
      breadcrumbs: [{ label: "Tərcümələr" }]
    }
  };
};

TranslationPage.Layout = AdminLayout;

export default TranslationPage;
