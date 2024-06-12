import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layout/AdminLayout";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { getUserById } from "../../api/users";
import { countries } from "@/lib/constants";
import NumberFormat from "react-number-format";

const validateConfirmPassword = (pass, value) => {
  let error = "";
  if (pass && value) {
    if (pass !== value) {
      error = "Şifrələr uyğun deyil";
    }
  }
  return error;
};

const FormSchema = Yup.object().shape({
  first_name: Yup.string().max(100).required("Bu sahə mütləqdir"),
  last_name: Yup.string().max(100).required("Bu sahə mütləqdir"),
  email: Yup.string().max(100).required("Bu sahə mütləqdir"),
  phone: Yup.string().max(100).required("Bu sahə mütləqdir"),
  password: Yup.string().when("change_password", {
    is: true,
    then: (schema) => schema.min(5, "Too Short!").max(50, "Too Long!"),
    otherwise: (schema) => schema.notRequired()
  }),
  password: Yup.string().when("change_password", {
    is: true,
    then: (schema) =>
      schema
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .required("Bu sahə mütləqdir"),
    otherwise: (schema) => schema.notRequired()
  }),
  confirm_password: Yup.string().when("change_password", {
    is: true,
    then: (schema) =>
      schema
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .required("Bu sahə mütləqdir"),
    otherwise: (schema) => schema.notRequired()
  }),
  country: Yup.string().max(9).required("Bu sahə mütləqdir")
});

const Dashboard = ({ user, pageLabel }) => {
  const router = useRouter();

  const id = router.query?.id;

  const initialValues = useMemo(
    () =>
      id === "new"
        ? {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
            country: "AZ",
            change_password: true
          }
        : {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            password: "",
            confirm_password: "",
            country: user.country,
            change_password: false
          },
    [id, user]
  );

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/users/${id}`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        if (res.data.type === "field-error") {
          setErrors(res.data.message);
        } else {
          toast.success("Yadda saxlanıldı");
          router.push("/admin/users");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }

    await setSubmitting(false);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Silməyə əminsiniz?")) {
      try {
        const res = await axios.delete(`/api/users/${id}`, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success("Silindi");
          router.push("/admin/users");
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
        <h1 className="font-semibold text-xl">{pageLabel}</h1>
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
              <div className="flex gap-4 mb-4">
                <div className="w-full">
                  <label className="f-label" htmlFor="first_name">
                    Ad
                  </label>
                  <Field className="f-input" type="text" name="first_name" />
                  <ErrorMessage
                    component="div"
                    className="f-error"
                    name="first_name"
                  />
                </div>
                <div className="w-full">
                  <label className="f-label" htmlFor="last_name">
                    Soyad
                  </label>
                  <Field className="f-input" type="text" name="last_name" />
                  <ErrorMessage
                    component="div"
                    className="f-error"
                    name="last_name"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="f-label" htmlFor="email">
                  Email
                </label>
                <Field className="f-input" type="email" name="email" />
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="email"
                />
              </div>
              <div className="mb-4">
                <label className="f-label" htmlFor="phone">
                  Telefon
                </label>
                <Field
                  as={NumberFormat}
                  format="+994 (###) ###-####"
                  mask="_"
                  className="f-input"
                  name="phone"
                  type="text"
                  // placeholder="+994556667788"
                />
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="phone"
                />
              </div>
              <div className="mb-4">
                <label className="f-label" htmlFor="country">
                  Ölkə
                </label>
                <Field
                  className="f-input"
                  name="country"
                  type="text"
                  as="select"
                >
                  {countries.map(({ label, value }, i) => (
                    <option key={i} value={value}>
                      {label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  component="div"
                  className="f-error"
                  name="country"
                />
              </div>

              {id !== "new" && id > 0 && (
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <Field
                    type="checkbox"
                    className="f-checkbox"
                    name="change_password"
                  />
                  <span className="text-sm">Şifrəni dəyiş</span>
                </label>
              )}

              {values.change_password === true && (
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label className="f-label" htmlFor="password">
                      Yeni Şifrə
                    </label>
                    <Field className="f-input" type="text" name="password" />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name="password"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="f-label" htmlFor="confirm_password">
                      Yeni Şifrə (Təkrar)
                    </label>
                    <Field
                      className="f-input"
                      type="text"
                      name="confirm_password"
                      validate={(value) =>
                        validateConfirmPassword(values.password, value)
                      }
                    />
                    <ErrorMessage
                      component="div"
                      className="f-error"
                      name="confirm_password"
                    />
                  </div>
                </div>
              )}

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

export const getServerSideProps = async ({ query }) => {
  let pageLabel = "Yeni müştəri";
  let user = null;
  if (query.id !== "new") {
    user = await getUserById(query?.id);
    pageLabel = user?.first_name;
  }
  if (!user && query.id !== "new") return { notFound: true };

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      pageLabel,
      breadcrumbs: [
        { label: "Müştərilər", href: "/admin/users" },
        { label: pageLabel }
      ]
    }
  };
};

Dashboard.Layout = AdminLayout;

export default Dashboard;
