import React from "react";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { signIn } from "next-auth/react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("me:form-field-required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("me:form-field-required")
});

const SignIn = ({ csrfToken }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const cbUrl = router.query?.callbackUrl || window.location.origin;
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: cbUrl
    });
    if (res?.error) {
      setErrors({ password: res.error });
    }
    if (res.url) router.push(res.url);
    await setSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{t("me:login-account")}</h1>
      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: "",
          password: "",
          csrfToken
        }}
        validationSchema={LoginSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="hidden" name="csrfToken" />
            <div className="mb-4 relative">
              <Field
                className="f-input peer pl-9"
                type="email"
                name="email"
                placeholder={t("me:form-email")}
              />
              <UserIcon className="pointer-events-none absolute w-5 h-5 top-[11px] text-gray-400 peer-focus:text-th-600 left-2.5" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="email"
              />
            </div>
            <div className="mb-4 relative">
              <Field
                className="f-input peer pl-9"
                type="password"
                name="password"
                placeholder={t("me:form-password")}
              />
              <LockClosedIcon className="pointer-events-none peer-focus:text-th-600 absolute w-5 h-5 top-[11px] text-gray-400 left-2.5" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="password"
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Field
                  type="checkbox"
                  className="f-checkbox"
                  name="remember_me"
                />
                <span className="text-sm"> {t("me:form-rememberMe")}</span>
              </label>
              <Link href="/auth/forgot-password">
                <a className="font-medium text-th-600 text-sm hover:underline">
                  {t("me:forgot-password")}
                </a>
              </Link>
            </div>

            <button
              disabled={isSubmitting}
              className="flex w-full disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
              type="submit"
            >
              {isSubmitting ? "Loading..." : t("me:form-login")}
            </button>
            <div className="mt-6 flex  gap-2 justify-center text-center text-sm text-gray-500">
              {t("me:dont-have-account")}

              <Link href="/auth/register">
                <a className="font-medium text-th-600 hover:underline">
                  {t("me:form-register")}
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
