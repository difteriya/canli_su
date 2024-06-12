import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";
import UploadSingle from "@/components/Upload/Single";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { languages } from "@/lib/constants";

const FormSchema = Yup.object().shape({
  products_langs: Yup.array()
    .of(
      Yup.object().shape({
        lang: Yup.string().max(10).required("Bu sahə mütləqdir"),
        name: Yup.string().required("Bu sahə mütləqdir"),
        description: Yup.string().required("Bu sahə mütləqdir")
      })
    )
    .min(languages.length)
    .required("Bu sahə mütləqdir"),
  category_id: Yup.number().min(1).required("Bu sahə mütləqdir"),
  price: Yup.string().max(500, "Too Long!").required("Bu sahə mütləqdir"),
  photo: Yup.string().required("Bu sahə mütləqdir")
});

const Dashboard = ({ product, categories }) => {
  const [lang, setLang] = useState("az");
  const router = useRouter();

  const id = router.query?.id;

  const initialValues = useMemo(
    () =>
      id === "new"
        ? {
            price: "",
            category_id: "",
            photo: "",
            products_langs: languages.map(({ value }) => ({
              lang: value,
              name: "",
              description: ""
            }))
          }
        : {
            ...product,
            products_langs: languages.map(({ value }) => {
              const p = product.products_langs.find((p) => p.lang === value);
              return {
                rid: Number(id),
                lang: value,
                name: p?.name || "",
                description: p?.description || ""
              };
            })
          },
    [id, product]
  );

  const label = useMemo(
    () =>
      id === "new"
        ? "Yeni məhsul"
        : `Dəyiş: ${product.products_langs.find((l) => l.lang === "az")?.name}`,
    [id, product]
  );

  const onLangChange = (e) => {
    setLang(e.target.value);
  };
  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/products/${id}`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success("Məhsul yaradıldı");
        router.push("/admin/products");
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
        const res = await axios.delete(`/api/products/${id}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Məhsul silindi");
          router.push("/admin/products");
        }
      } catch (error) {
        toast.error(error.message);
      }
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
              <div className="mb-4">
                <label className="f-label" htmlFor="name">
                  Şəkil
                </label>
                <UploadSingle
                  folder="products"
                  value={values.photo}
                  onChange={(v) => setFieldValue("photo", v)}
                />
                <Field type="hidden" name="photo" />
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="photo"
                />
              </div>
              {languages.map(({ value }, index) => (
                <div key={value}>
                  <Field type="hidden" name={`products_langs.${index}.lang`} />

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`products_langs.${index}.name`}
                    >
                      Məhsulun adı (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`products_langs.${index}.name`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`products_langs.${index}.name`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`products_langs.${index}.description`}
                    >
                      Təsviri (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      as="textarea"
                      rows={6}
                      name={`products_langs.${index}.description`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`products_langs.${index}.description`}
                    />
                  </div>
                </div>
              ))}

              <div className="mb-4">
                <label className="f-label" htmlFor="price">
                  Qiyməti
                </label>
                <Field className="f-input" type="number" name="price" />
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="price"
                />
              </div>

              <div className="mb-4">
                <label className="f-label" htmlFor="category_id">
                  Kateqoriyası
                </label>
                <Field
                  className="f-input"
                  name="category_id"
                  type="text"
                  as="select"
                >
                  <option value={""}>Seçin</option>
                  {categories.map(({ id, category_langs }, i) => {
                    const name = category_langs.find(
                      (c) => c.lang === "az"
                    )?.name;
                    return (
                      <option key={i} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="category_id"
                />
              </div>

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
  let pageLabel = "Yeni məhsul";
  let product = {};
  if (params.id !== "new") {
    const _res = await fetch(
      `${process.env.API_PATH}/api/products/${params.id}`
    );
    product = await _res.json();

    if (!product) return { notFound: true };

    const name = product.products_langs?.find((l) => l.lang === "az")?.name;
    pageLabel = name;
  }

  const _cat_res = await fetch(`${process.env.API_PATH}/api/category`);
  const categories = await _cat_res.json();

  return {
    props: {
      product,
      categories,
      breadcrumbs: [
        { label: "Məhsullar", href: "/admin/products" },
        { label: pageLabel }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
