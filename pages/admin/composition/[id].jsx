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
  composition_langs: Yup.array()
    .of(
      Yup.object().shape({
        lang: Yup.string().max(10).required("Bu sahə mütləqdir"),
        e_name: Yup.string().required("Bu sahə mütləqdir"),
        e_symbol: Yup.string().required("Bu sahə mütləqdir"),
        e_value: Yup.string().required("Bu sahə mütləqdir"),
        description: Yup.string().required("Bu sahə mütləqdir"),
        body: Yup.string().required("Bu sahə mütləqdir")
      })
    )
    .min(languages.length)
    .required("Bu sahə mütləqdir")
});

const CompositionFormPage = ({ composition }) => {
  const [lang, setLang] = useState("az");
  const router = useRouter();

  const id = router.query?.id;

  const initialValues = useMemo(
    () =>
      id === "new"
        ? {
            composition_langs: languages.map(({ value }) => ({
              lang: value,
              e_name: "",
              e_symbol: "",
              e_value: "",
              description: "",
              body: ""
            }))
          }
        : {
            ...composition,
            composition_langs: languages.map(({ value }) => {
              const p = composition.composition_langs.find(
                (p) => p?.lang === value
              );
              return {
                rid: Number(id),
                lang: value,
                e_name: p?.e_name || "",
                e_symbol: p?.e_symbol || "",
                e_value: p?.e_value || "",
                description: p?.description || "",
                body: p?.body || ""
              };
            })
          },
    [id, composition]
  );

  const label = useMemo(
    () =>
      id === "new"
        ? "Yarat"
        : `Dəyiş: ${
            composition.composition_langs.find((l) => l.lang === "az")?.e_name
          }`,
    [id, composition]
  );

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/composition/${id}`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
  
        toast.success("Suyun tərkibi yaradıldı");
        router.push("/admin/composition");
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
        const res = await axios.delete(`/api/composition/${id}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Suyun tərkibi silindi");
          router.push("/admin/composition");
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
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-6">
              {languages.map(({ value }, index) => (
                <div key={value}>
                  <Field
                    type="hidden"
                    name={`composition_langs.${index}.lang`}
                  />

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`composition_langs.${index}.e_symbol`}
                    >
                      Simvol (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`composition_langs.${index}.e_symbol`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`composition_langs.${index}.e_symbol`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`composition_langs.${index}.e_name`}
                    >
                      Tam adı (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`composition_langs.${index}.e_name`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`composition_langs.${index}.e_name`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`composition_langs.${index}.e_value`}
                    >
                      Miqdar (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`composition_langs.${index}.e_value`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`composition_langs.${index}.e_value`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`composition_langs.${index}.description`}
                    >
                      Qısa məlumat (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      as="textarea"
                      rows={3}
                      name={`composition_langs.${index}.description`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`composition_langs.${index}.description`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`composition_langs.${index}.body`}
                    >
                      Tam məlumat (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      as="textarea"
                      rows={10}
                      name={`composition_langs.${index}.body`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`composition_langs.${index}.body`}
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
  let pageLabel = "Yarat";
  let composition = {};
  if (params.id !== "new") {
    const _res = await fetch(
      `${process.env.API_PATH}/api/composition/${params.id}`
    );
    composition = await _res.json();

    if (!composition) return { notFound: true };

    const name = composition.composition_langs?.find(
      (l) => l.lang === "az"
    )?.e_name;
    pageLabel = name;
  }

  return {
    props: {
      composition,
      breadcrumbs: [
        { label: "Suyun  tərkibi", href: "/admin/composition" },
        { label: pageLabel }
      ]
    }
  };
};

CompositionFormPage.Layout = AdminLayout;

export default CompositionFormPage;
