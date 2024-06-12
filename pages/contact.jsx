import { useCallback, useRef } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "@/components/Layout/PageHead";
import {
  LocationMarkerIcon,
  PhoneIcon,
  AtSymbolIcon
} from "@heroicons/react/solid";
import { Instagram, Facebook } from "react-feather";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";

const ContactFormSchema = Yup.object().shape({
  fullname: Yup.string()
    .max(100, "Too Long!")
    .required("me:form-field-required"),
  email: Yup.string().email("Invalid email").required("me:form-field-required"),
  message: Yup.string().max(500, "Too Long!").required("me:form-field-required")
});

const ContactPage = (props) => {
  const router = useRouter();

  const { t } = useTranslation();
  const recaptchaRef = useRef();

  const onSubmit = async (values, actions) => {
    try {
      const token = await recaptchaRef.current.executeAsync();
      console.log(token);
      if (token) {
        const res = await axios.post(`/api/site/message`, values, {
          withCredentials: true
        });
        if (res.status === 200) {
          toast.success(t("common:form-message-sended"));
          setTimeout(() => recaptchaRef.current.reset(), 500);
          actions.resetForm();
        }
      }
      await actions.setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageHead
        data={{
          title: t("common:nav-link-contact")
        }}
      />
      <Head>
        <title>{t("common:nav-link-contact")}</title>
      </Head>
      <div className="container max-w-screen-lg mx-auto pb-16 mt-4 px-2 ">
        <div className=" flex flex-col md:flex-row gap-6">
          <div className="flex flex-col shrink-0 w-full md:w-1/3 gap-6">
            <div className="w-full bg-white   shadow-2xl shadow-th-700/10 rounded-xl p-6">
              <h2 className=" font-semibold border-l-4 border-th-600 pl-4">
                {t("contact:address-title")}
              </h2>
              <ul className="mt-6">
                <li className="mb-3 flex items-center gap-2">
                  <LocationMarkerIcon className="h-6 w-6 text-th-600" />
                  <span>{t("contact:address-location")}</span>
                </li>
                <li className="mb-3 flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-th-600" />
                  <span>{t("contact:address-phone")}</span>
                </li>
                <li className="mb-3 flex items-center gap-2">
                  <AtSymbolIcon className="h-5 w-5 text-th-600" />
                  <span>{t("contact:address-email")}</span>
                </li>
              </ul>
            </div>
            <div className="w-full bg-white  shadow-2xl shadow-th-700/10 rounded-xl p-6">
              <h2 className="font-semibold border-l-4 border-th-600 pl-4">
                {t("contact:social-title")}
              </h2>
              <ul className="mt-6">
                <li className="mb-3 block">
                  <a
                    href={`https://instagram.com/${t(
                      "contact:social-instagram"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-5 w-5 text-th-600" />
                    <span>{t("contact:social-instagram")}</span>
                  </a>
                </li>
                <li className="mb-3 block">
                  <a
                    href={`https://fb.com/${t("contact:social-facebook")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Facebook className="h-5 w-5 text-th-600" />
                    <span>{t("contact:social-facebook")}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full bg-white shadow-2xl shadow-th-700/10 rounded-xl p-6">
            <h2 className="text-xl text-gray-700 mb-6 font-semibold text-center">
              {t("contact:form-title")}
            </h2>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onSubmit}
              initialValues={{
                fullname: "",
                email: "",
                message: ""
              }}
              validationSchema={ContactFormSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
                    ref={recaptchaRef}
                    size="invisible"
                    hl={router?.locale || "az"}
                  />
                  <div className="mb-4">
                    <label className="f-label" htmlFor="fullname">
                      {t("contact:form-field-fullname")}
                    </label>
                    <Field className="f-input" type="text" name="fullname" />
                    <ErrorMessage
                      render={(msg) => <div className="f-error">{t(msg)}</div>}
                      name="fullname"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="f-label" htmlFor="email">
                      {t("contact:form-field-email")}
                    </label>
                    <Field className="f-input" type="email" name="email" />
                    <ErrorMessage
                      name="email"
                      render={(msg) => <div className="f-error">{t(msg)}</div>}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="f-label" htmlFor="message">
                      {t("contact:form-field-message")}
                    </label>
                    <Field
                      className="f-input"
                      as="textarea"
                      rows="4"
                      name="message"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="f-error">{t(msg)}</div>}
                      name="message"
                    />
                  </div>

                  <div>
                    <button
                      disabled={isSubmitting}
                      className="flex ml-auto disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
                      type="submit"
                    >
                      {t("contact:form-btn-send")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="w-full mt-6  bg-white  shadow-2xl shadow-th-700/10 rounded-xl p-6">
          <iframe
            width="100%"
            height="450"
            className="border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.NEXT_PUBLIC_GOOGLE_EMBED_MAP_KEY
            }A&language=az&q=${t("contact:form-map-locations")}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "contact", "me"]))
    }
  };
};

ContactPage.Layout = Layout;
export default ContactPage;
