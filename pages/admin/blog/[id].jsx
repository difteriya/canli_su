import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";
import UploadSingle from "@/components/Upload/Single";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { languages } from "@/lib/constants";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { getPostById } from "../../api/blog/[id]";

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
  photo: Yup.string().required("Bu sahə mütləqdir")
  // blog_langs: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       lang: Yup.string().max(10).required("Bu sahə mütləqdir"),
  //       title: Yup.string().required("Bu sahə mütləqdir"),
  //       subtitle: Yup.string().required("Bu sahə mütləqdir"),
  //       alias: Yup.string()
  //         .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, "Səhv format")
  //         .required("Bu sahə mütləqdir")
  //     })
  //   )
  //   .min(languages.length)
  //   .required("Bu sahə mütləqdir")
});

const Dashboard = ({ post, pageLabel }) => {
  const [lang, setLang] = useState("az");
  const router = useRouter();

  const alias = router.query?.id;

  const initialValues = useMemo(
    () =>
      alias === "new"
        ? {
            photo: "",
            active: true,
            blog_langs: languages.map(({ value }) => ({
              lang: value,
              title: "",
              subtitle: "",
              alias: "",
              body: EditorState.createWithContent(emptyContentState)
            }))
          }
        : {
            ...post,
            blog_langs: languages.map(({ value }) => {
              const p = post.blog_langs.find((p) => p.lang === value);
              return {
                rid: post.id,
                lang: value,
                title: p?.title || "",
                subtitle: p?.subtitle || "",
                alias: p?.alias || "",
                body: EditorState.createWithContent(
                  p?.body
                    ? convertFromRaw(JSON.parse(p.body))
                    : emptyContentState
                )
              };
            })
          },
    [alias, post]
  );

  const label = useMemo(
    () => (alias === "new" ? "Yeni" : `Dəyiş: ${pageLabel}`),
    [alias]
  );

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onSubmit = async (values, actions) => {
    try {
      const blog_langs = values.blog_langs.map((v) => ({
        ...v,
        body: JSON.stringify(convertToRaw(v.body.getCurrentContent()))
      }));
      const res = await axios.post(
        `/api/blog/${alias}`,
        { ...values, blog_langs },
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        toast.success("Yadda saxlanildi");
        router.push("/admin/blog");
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
        const res = await axios.delete(`/api/blog/${alias}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Silindi");
          router.push("/admin/blog");
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
              <div className="mb-4">
                <label className="f-label" htmlFor="name">
                  Şəkil
                </label>
                <UploadSingle
                  folder="blog"
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
                  <Field type="hidden" name={`blog_langs.${index}.lang`} />

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`blog_langs.${index}.title`}
                    >
                      Başlıq (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`blog_langs.${index}.title`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`blog_langs.${index}.title`}
                    />
                  </div>
                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`blog_langs.${index}.alias`}
                    >
                      Url (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      placeholder="Məs. sagliqli-temiz-su-nece-olmalidir"
                      name={`blog_langs.${index}.alias`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`blog_langs.${index}.alias`}
                    />
                  </div>
                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`blog_langs.${index}.subtitle`}
                    >
                      Alt başlıq (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`blog_langs.${index}.subtitle`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`blog_langs.${index}.subtitle`}
                    />
                  </div>
                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`blog_langs.${index}.body`}
                    >
                      Təsvir (<span className="uppercase">{value}</span>)
                    </label>
                    <MyEditor
                      editorState={values.blog_langs[index].body}
                      onChange={(s) =>
                        setFieldValue(`blog_langs.${index}.body`, s)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`blog_langs.${index}.body`}
                    />
                  </div>
                </div>
              ))}

              <label className="flex items-center gap-2 cursor-pointer mb-10">
                <Field type="checkbox" className="f-checkbox" name="active" />
                <span className="text-sm">Aktiv</span>
              </label>

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

export const getServerSideProps = async ({ query }) => {
  let pageLabel = "Yeni";
  let post = null;
  if (query.id !== "new") {
    post = await getPostById(query?.id);
    pageLabel = post.blog_langs.find((l) => l.lang === "az")?.title;
  }
  if (!post && query.id !== "new") return { notFound: true };

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      pageLabel,
      breadcrumbs: [
        { label: "Blog", href: "/admin/blog" },
        { label: pageLabel }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
