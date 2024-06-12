import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { translationKeys, languages } from "@/lib/constants";

const Dashboard = ({ translation }) => {
  const router = useRouter();

  const { id, lang } = router.query;

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/translation/${lang}/${id}`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        if (id === "common" || id === "home") {
        
        }
        toast.success("Yadda saxlanıldı");
        router.push("/admin/translation");
      }
    } catch (error) {
      toast.error(error.message);
    }

    await actions.setSubmitting(false);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={translation}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="p-4 flex items-center justify-between">
              <h1 className="font-semibold text-xl">Dəyiş: {id}</h1>
              <button
                disabled={isSubmitting}
                className="flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                type="submit"
              >
                {isSubmitting ? "Saxlanılır..." : "Saxla"}
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                      <tr className="border-b border-t border-gray-200/75">
                        <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Key
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {translation.map(({ key, value }, index) => {
                        return (
                          <tr
                            key={key}
                            className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                          >
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                              {key}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-500">
                              <Field type="hidden" name={`${index}.key`} />
                              <Field
                                className="f-input !transition-none !ring-0"
                                type="text"
                                as="textarea"
                                name={`${index}.value`}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { id, lang } = params;

  if (!translationKeys.includes(id)) return { notFound: true };

  const _res = await fetch(
    `${process.env.API_PATH}/api/translation/${lang}/${id}`
  );
  let result = await _res.json();

  if (result) {
    result = Object.entries(result).map(([key, value]) => ({ key, value }));
  }

  return {
    props: {
      translation: result,
      breadcrumbs: [
        { label: "Tərcümələr", href: "/admin/translation" },
        { label: `Dəyiş (${lang})` }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
