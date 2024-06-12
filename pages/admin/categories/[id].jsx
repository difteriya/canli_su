import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { languages } from "@/lib/constants";

const FormSchema = Yup.object().shape({
  category_langs: Yup.array()
    .of(
      Yup.object().shape({
        lang: Yup.string().max(10).required("Bu sahə mütləqdir"),
        name: Yup.string().required("Bu sahə mütləqdir")
      })
    )
    .min(languages.length)
    .required("Bu sahə mütləqdir")
});

const Dashboard = ({ category }) => {
  const [lang, setLang] = useState("az");
  const router = useRouter();

  const id = router.query?.id;

  const initialValues = useMemo(
    () =>
      id === "new"
        ? {
            category_langs: languages.map(({ value }) => ({
              lang: value,
              name: ""
            }))
          }
        : {
            ...category,
            category_langs: languages.map(({ value }) => {
              const p = category.category_langs.find((p) => p.lang === value);
              return {
                rid: Number(id),
                lang: value,
                name: p?.name || ""
              };
            })
          },
    [id, category]
  );

  const label = useMemo(
    () =>
      id === "new"
        ? "Yeni kateqoriya"
        : `Dəyiş: ${
            category.category_langs.find((l) => l.lang === "az")?.name
          }`,
    [id, category]
  );

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/category/${id}`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success("Məhsul yaradıldı");
        router.push("/admin/categories");
      }
    } catch (error) {
      toast.error(error.message);
    }

    await actions.setSubmitting(false);

    //
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Silməyə əminsiniz?")) {
      try {
        const res = await axios.delete(`/api/category/${id}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Məhsul silindi");
          router.push("/admin/categories");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between  mb-6">
        <h1 className="font-semibold text-xl">{label}</h1>
        <select
          onChange={onLangChange}
          value={lang}
          className="f-input !w-auto"
        >
          {languages.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={FormSchema}
      >
        {({ values, setFieldValue, isSubmitting, errors }) => (
          <Form>
            <div className="mt-6">
              {languages.map(({ value }, index) => (
                <div key={value}>
                  <Field type="hidden" name={`category_langs.${index}.lang`} />

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`category_langs.${index}.name`}
                    >
                      Kateqoriya adı (<span className="uppercase">{value}</span>
                      )
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`category_langs.${index}.name`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`category_langs.${index}.name`}
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between w-full">
                {id !== "new" && id > 0 && (
                  <button
                    onClick={onDelete}
                    disabled={isSubmitting}
                    className="flex disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-red-600 bg-white px-6 py-3 font-semibold text-red-600 shadow-sm hover:bg-red-600 hover:text-white"
                  >
                    Sil
                  </button>
                )}
                <button
                  disabled={isSubmitting}
                  className="flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                  type="submit"
                >
                  {isSubmitting ? "Saxlanılır..." : "Saxla"}
                </button>
              </div>
            </div>
            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  let pageLabel = "Yeni kateqoriya";
  let category = {};
  if (params.id !== "new") {
    const _res = await fetch(
      `${process.env.API_PATH}/api/category/${params.id}`
    );
    category = await _res.json();

    if (!category) return { notFound: true };

    const name = category.category_langs?.find((l) => l.lang === "az")?.name;
    pageLabel = name;
  }

  return {
    props: {
      category,
      breadcrumbs: [
        { label: "Kateqoriyalar", href: "/admin/categories" },
        { label: pageLabel }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
