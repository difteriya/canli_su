import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountLayout from "@/components/Layout/AccountLayout";
import { countries } from "@/lib/constants";
import NumberFormat from "react-number-format";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getUserSession, getUser } from "../api/site/me";

const ProfileFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(100, "Too Long!")
    .required("me:form-field-required"),
  last_name: Yup.string()
    .max(100, "Too Long!")
    .required("me:form-field-required"),
  email: Yup.string().email("Invalid email").required("me:form-field-required"),
  phone: Yup.string().max(100, "Too Long!").required("me:form-field-required"),
  country: Yup.string().max(2, "Too Long!").required("me:form-field-required")
});

const PasswordFormSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("me:form-field-required"),
  current_password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("me:form-field-required")
});

const Profile = ({ userData }) => {
  console.log(userData);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [initialValues, _] = useState(() => {
    // const { first_name, last_name, email, phone, country } = userData;
    return (
      userData || {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "AZ"
      }
    );
  });

  // useEffect(() => {
  //   async function fetchData(id) {
  //     try {
  //       const res = await axios.get(`/api/site/me/${id}`, {
  //         withCredentials: true
  //       });
  //       if (res.status === 200) {
  //         const { first_name, last_name, email, phone, country } = res.data;
  //         setInitialValues({ first_name, last_name, email, phone, country });
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }

  //   if (id) {
  //     fetchData(id);
  //   }
  // }, [id]);

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/site/me`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        if (res.data.type === "field-error") {
          setErrors(res.data.message);
        } else {
          toast.success(t("me:form-success-changed"));
        }
      }
    } catch (error) {
      toast.error(error.message);
    }

    await setSubmitting(false);
  };

  const onSubmitPassword = async (values, { setErrors, setSubmitting }) => {
    console.log(values);
    try {
      const res = await axios.post(`/api/site/me?c=changePassword`, values, {
        withCredentials: true
      });
      if (res.status === 200) {
        if (res.data.type === "field-error") {
          setErrors(res.data.message);
        } else {
          toast.success(t("me:form-success-changed"));
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data ? t(error?.response?.data) : error.message
      );
    }

    await setSubmitting(false);
  };

  return (
    <AccountLayout loading={loading} title={t("common:user-orders")}>
      <div className="p-4 md:p-6 relative overflow-hidden">
        <h1 className="font-semibold text-2xl mb-6">
          {t("common:user-profile")}
        </h1>
        <h2 className="text-l mb-4 font-semibold">
          {t("me:profile-change-title")}
        </h2>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={ProfileFormSchema}
        >
          {({ isSubmitting }) => (
            <Form className="md:max-w-[50%]">
              <div className="mb-4 flex gap-4">
                <div>
                  <label className="f-label" htmlFor="first_name">
                    {t("me:form-firstname")}
                  </label>
                  <Field className="f-input" name="first_name" type="text" />
                  <ErrorMessage
                    render={(msg) => <div className="f-error">{t(msg)}</div>}
                    name="first_name"
                  />
                </div>
                <div>
                  <label className="f-label" htmlFor="last_name">
                    {t("me:form-lastname")}
                  </label>
                  <Field className="f-input" name="last_name" type="text" />
                  <ErrorMessage
                    render={(msg) => <div className="f-error">{t(msg)}</div>}
                    name="last_name"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="f-label" htmlFor="email">
                  {t("me:form-email")}{" "}
                  {userData.status === 0 ? (
                    <span className="ml-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                      not verified
                    </span>
                  ) : (
                    <span className="ml-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">verified</span>
                  )}
                </label>
                <Field
                  className="f-input"
                  name="email"
                  type="email"
                  disabled={userData.status === 1}
                />
                <ErrorMessage
                  render={(msg) => <div className="f-error">{t(msg)}</div>}
                  name="email"
                />
              </div>
              <div className="mb-4">
                <label className="f-label" htmlFor="phone">
                  {t("me:form-phone")}
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
                  render={(msg) => <div className="f-error">{t(msg)}</div>}
                  name="phone"
                />
              </div>

              <div className="mb-4">
                <label className="f-label" htmlFor="country">
                  {t("me:form-country")}
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
                  render={(msg) => <div className="f-error">{t(msg)}</div>}
                  name="country"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="flex  disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                type="submit"
              >
                {isSubmitting ? t("common:loading") : t("me:form-btn-save")}
              </button>
            </Form>
          )}
        </Formik>

        <h2 className="text-lg mb-4 font-semibold mt-10 border-t pt-10">
          {t("me:password-change-title")}
        </h2>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={onSubmitPassword}
          initialValues={{
            new_password: "",
            current_password: ""
          }}
          validationSchema={PasswordFormSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex gap-6">
                <div className="mb-4">
                  <label className="f-label" htmlFor="new_password">
                    {t("me:form-new-password")}
                  </label>
                  <Field className="f-input" name="new_password" type="text" />
                  <ErrorMessage
                    render={(msg) => <div className="f-error">{t(msg)}</div>}
                    name="new_password"
                  />
                </div>
                <div className="mb-4">
                  <label className="f-label" htmlFor="current_password">
                    {t("me:form-current-password")}
                  </label>
                  <Field
                    className="f-input"
                    name="current_password"
                    type="text"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="f-error">{t(msg)}</div>}
                    name="current_password"
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="inline-flex  disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                type="submit"
              >
                {isSubmitting ? t("common:loading") : t("me:form-btn-change")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </AccountLayout>
  );
};

export const getServerSideProps = async ({ req, res, locale }) => {
  let user = await getUserSession(req, res);
  // user = JSON.parse(JSON.stringify(user));

  if (!user?.id) {
    return {
      notFound: true
    };
  }

  const userData = await getUser(user?.id);

  return {
    props: {
      userData: userData,
      ...(await serverSideTranslations(locale, ["common", "me"]))
    }
  };
};

Profile.Layout = Layout;

export default Profile;
