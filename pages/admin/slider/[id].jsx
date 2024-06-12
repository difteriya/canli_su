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
  slider_langs: Yup.array()
    .of(
      Yup.object().shape({
        lang: Yup.string().max(10).required("Bu sahə mütləqdir"),
        title: Yup.string().required("Bu sahə mütləqdir"),
        photo: Yup.string().required("Bu sahə mütləqdir")
      })
    )
    .min(languages.length)
    .required("Bu sahə mütləqdir")
});

const Dashboard = ({ slider }) => {
  const [lang, setLang] = useState("az");
  const router = useRouter();

  const id = router.query?.id;

  const initialValues = useMemo(
    () =>
      id === "new"
        ? {
            slider_langs: languages.map(({ value }) => ({
              lang: value,
              title: "",
              subtitle: "",
              photo: "",
              url: ""
            }))
          }
        : {
            ...slider,
            slider_langs: languages.map(({ value }) => {
              const p = slider.slider_langs.find((p) => p.lang === value);
              return {
                rid: Number(id),
                lang: value,
                title: p.title || "",
                subtitle: p.subtitle || "",
                photo: p.photo || "",
                url: p.url || ""
              };
            })
          },
    [id, slider]
  );

  const label = useMemo(
    () =>
      id === "new"
        ? "Yeni slayder"
        : `Dəyiş: ${slider.slider_langs.find((l) => l.lang === "az")?.title}`,
    [id, slider]
  );

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/slider/${id}`, values, {
        withCredentials: true
      });

      if (res.status === 200) {
    
        toast.success("Slayder yaradıldı");
        router.push("/admin/slider");
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
        const res = await axios.delete(`/api/slider/${id}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Slayder silindi");
          router.push("/admin/slider");
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
                  <Field type="hidden" name={`slider_langs.${index}.lang`} />

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`slider_langs.${index}.photo`}
                    >
                      Şəkil (<span className="uppercase">{value}</span>)
                    </label>
                    <UploadSingle
                      folder="slider"
                      value={
                        values.slider_langs.find((s) => s.lang === value)
                          ?.photo || ""
                      }
                      onChange={(v) =>
                        setFieldValue(`slider_langs.${index}.photo`, v)
                      }
                    />
                    <Field
                      className="f-input"
                      type="hidden"
                      name={`slider_langs.${index}.photo`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`slider_langs.${index}.photo`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`slider_langs.${index}.title`}
                    >
                      Başlıq (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`slider_langs.${index}.title`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`slider_langs.${index}.title`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`slider_langs.${index}.url`}
                    >
                      Keçid(Link) (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name={`slider_langs.${index}.url`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`slider_langs.${index}.url`}
                    />
                  </div>

                  <div className={`mb-4 ${lang !== value ? "hidden" : ""}`}>
                    <label
                      className="f-label"
                      htmlFor={`slider_langs.${index}.subtitle`}
                    >
                      Təsviri (<span className="uppercase">{value}</span>)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      as="textarea"
                      rows={6}
                      name={`slider_langs.${index}.subtitle`}
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name={`slider_langs.${index}.subtitle`}
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
  let pageLabel = "Yeni məhsul";
  let slider = {};
  if (params.id !== "new") {
    const _res = await fetch(`${process.env.API_PATH}/api/slider/${params.id}`);
    slider = await _res.json();

    if (!slider) return { notFound: true };

    const name = slider.slider_langs?.find((l) => l.lang === "az")?.title;
    pageLabel = name;
  }

  return {
    props: {
      slider,
      breadcrumbs: [
        { label: "Slayder", href: "/admin/slider" },
        { label: pageLabel }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
