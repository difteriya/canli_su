import { useRef } from "react";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { countries } from "@/lib/constants";
import NumberFormat from "react-number-format";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Etibarsız e-poçt")
    .required("me:form-field-required"),
  password: Yup.string()
    .max(50, "Çox uzun!")
    .required("me:form-field-required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Şifrə 8 simvol, bir böyük, bir kiçik və bir rəqəmdən ibarət olmalıdır"
    ),
  first_name: Yup.string()
    .max(100, "Çox uzun!")
    .required("me:form-field-required"),
  last_name: Yup.string()
    .max(100, "Çox uzun!")
    .required("me:form-field-required"),
  address: Yup.string()
    .max(500, "Çox uzun!")
    .required("me:form-field-required"),
  phone: Yup.string().max(100, "Çox uzun!").required("me:form-field-required"),
  country: Yup.string().max(2, "Çox uzun!").required("me:form-field-required"),
  city: Yup.string().max(100, "Çox uzun!").required("me:form-field-required")
});

const initialValues = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone: "",
  country: "AZ",
  city: "",
  address: ""
};

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const recaptchaRef = useRef();

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const token = await recaptchaRef.current.executeAsync();
      if (token) {
        const res = await axios.post(`/api/auth/register`, values, {
          withCredentials: true
        });

        if (res.status === 200) {
          if (res.data.type === "field-error") {
            setErrors(res.data.message);
          } else {
            toast.success(t("me:form-success-register"));
            await signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password
            });
            router.push("/verify-email");
          }
        }
      }
      await setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        {t("me:create-your-account")}
      </h1>

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={RegisterFormSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
              ref={recaptchaRef}
              size="invisible"
              hl={router?.locale || "az"}
              // onChange={(token) => setFieldValue("recaptcha", token)}
            />
            <div className="mb-4">
              <label className="f-label" htmlFor="email">
                {t("me:form-email")}
              </label>
              <Field className="f-input" type="email" name="email" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="email"
              />
            </div>
            <div className="mb-4">
              <label className="f-label" htmlFor="password">
                {t("me:form-password")}
              </label>
              <Field className="f-input" type="password" name="password" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="password"
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div>
                <label className="f-label" htmlFor="first_name">
                  {t("me:form-firstname")}
                </label>
                <Field className="f-input" type="text" name="first_name" />
                <ErrorMessage
                  render={(msg) => <div className="f-error">{t(msg)}</div>}
                  name="first_name"
                />
              </div>
              <div>
                <label className="f-label" htmlFor="last_name">
                  {t("me:form-lastname")}
                </label>
                <Field className="f-input" type="text" name="last_name" />
                <ErrorMessage
                  render={(msg) => <div className="f-error">{t(msg)}</div>}
                  name="last_name"
                />
              </div>
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
              <Field className="f-input" name="country" type="text" as="select">
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

            <div className="mb-4">
              <label className="f-label" htmlFor="city">
                {t("me:form-city")}
              </label>
              <Field className="f-input" name="city" type="text" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="city"
              />
            </div>

            <div className="mb-4">
              <label className="f-label" htmlFor="address">
                {t("me:form-address")}
              </label>
              <Field className="f-input" name="address" type="text" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="address"
              />
            </div>

            <button
              disabled={isSubmitting}
              className="flex w-full disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
              type="submit"
            >
              {isSubmitting ? "Loading..." : t("me:create-an-account")}
            </button>
            <div className="mt-6 flex gap-2 justify-center text-center text-sm text-gray-500">
              {t("me:have-account")}
              <Link href="/auth/login">
                <a className="text-th-600 font-medium hover:underline">
                  {t("me:form-login")}
                </a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
