import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { languages } from "@/lib/constants";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";


const MyEditor = dynamic(() => import("@/components/MyEditor"), { ssr: false });

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: []
    }
  ]
});

const FormSchema = Yup.object().shape({
  alias: Yup.string().required("Bu sahə mütləqdir"),
  pages_langs: Yup.array()
    .of(
      Yup.object().shape({
        lang: Yup.string().max(10).required("Bu sahə mütləqdir")
        // title: Yup.string().required("Bu sahə mütləqdir")
      })
    )
    .min(languages.length)
    .required("Bu sahə mütləqdir")
});

const Dashboard = ({ cpage }) => {
  const [lang, setLang] = useState("az");
  const router = useRouter();

  const alias = router.query?.alias;

  const initialValues = useMemo(
    () =>
      alias === "new"
        ? {
            alias: "",
            pages_langs: languages.map(({ value }) => ({
              lang: value,
              title: "",
              body: EditorState.createWithContent(emptyContentState)
            }))
          }
        : {
            ...cpage,
            pages_langs: languages.map(({ value }) => {
              const p = cpage.pages_langs.find((p) => p.lang === value);
              return {
                rid: cpage.id,
                lang: value,
                title: p?.title || "",
                body: EditorState.createWithContent(
                  p?.body
                    ? convertFromRaw(JSON.parse(p.body))
                    : emptyContentState
                )
              };
            })
          },
    [alias, cpage]
  );

  const label = useMemo(
    () =>
      alias === "new"
        ? "Yeni səhifə"
        : `Dəyiş: ${cpage.pages_langs.find((l) => l.lang === "az")?.title}`,
    [alias, cpage]
  );

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onSubmit = async (values, actions) => {
    try {
      const pages_langs = values.pages_langs.map((v) => ({
        ...v,
        body: JSON.stringify(convertToRaw(v.body.getCurrentContent()))
      }));
      const res = await axios.post(
        `/api/cpages/${alias}`,
        { ...values, pages_langs },
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        toast.success("Səhifə yaradıldı");
        router.push("/admin/cpages");
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
        const res = await axios.delete(`/api/cpages/${alias}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Səhifə silindi");
          router.push("/admin/cpages");
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
              <div className={`mb-4`}>
                <label className="f-label" htmlFor="alias">
                  Alias
                </label>
                <Field className="f-input" type="text" name="alias" />
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="alias"
                />
              </div>
              {languages.map(({ value }, index) => (
                <div key={value}>
                  <Field type="hidden" name={`pages_langs.${index}.lang`} />

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`pages_langs.${index}.title`}
                    >
                      Səhifə adı (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`pages_langs.${index}.title`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`pages_langs.${index}.title`}
                    />
                  </div>
                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`pages_langs.${index}.body`}
                    >
                      Təsvir (<span className="uppercase">{value}</span>)
                    </label>
                    <MyEditor
                      editorState={values.pages_langs[index].body}
                      onChange={(s) =>
                        setFieldValue(`pages_langs.${index}.body`, s)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`pages_langs.${index}.body`}
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between w-full">
                {alias !== "new" && (
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
  let pageLabel = "Yeni səhifə";
  let cpage = {};
  if (params.alias !== "new") {
    const _res = await fetch(
      `${process.env.API_PATH}/api/cpages/${params.alias}`
    );
    cpage = await _res.json();

    if (!cpage) return { notFound: true };

    const name = cpage.pages_langs?.find((l) => l.lang === "az")?.title;
    pageLabel = name;
  }

  return {
    props: {
      cpage,
      breadcrumbs: [
        { label: "Səhifələr", href: "/admin/cpages" },
        { label: pageLabel }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
