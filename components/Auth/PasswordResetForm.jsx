import { useRef } from "react";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-hot-toast";

const PasswordResetFormSchema = Yup.object().shape({
  password: Yup.string().required("me:form-field-required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "me:form-password-must-match"
  )
});

const PasswordResetForm = ({ uid }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const recaptchaRef = useRef();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = await recaptchaRef.current.executeAsync();
      console.log(token);
      if (token) {
        const res = await axios.post(
          `/api/account?c=password-change`,
          { uid, ...values },
          {
            withCredentials: true
          }
        );
        if (res.status === 200) {
          toast.success(t("common:form-success-changed"));
          setTimeout(() => recaptchaRef.current.reset(), 500);
          resetForm();
          router.push("/auth/login");
        }
      }
      await setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-left w-full">
      <h1 className="text-2xl font-semibold mb-4">
        {t("me:password-change-title")}
      </h1>

      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={PasswordResetFormSchema}
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
              <label className="f-label" htmlFor="password">
                {t("me:form-new-password")}
              </label>
              <Field className="f-input" name="password" type="text" />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="password"
              />
            </div>
            <div className="mb-4">
              <label className="f-label" htmlFor="passwordConfirmation">
                {t("me:form-new-password-confirm")}
              </label>
              <Field
                className="f-input"
                name="passwordConfirmation"
                type="text"
              />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="passwordConfirmation"
              />
            </div>

            <button
              disabled={isSubmitting}
              className="flex w-full disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
              type="submit"
            >
              {isSubmitting ? "Loading..." : t("me:form-btn-change")}
            </button>
            <div className="mt-6 flex  gap-2 justify-center text-center text-sm text-gray-500">
              <Link href="/auth/login">
                <a className="text-th-600 font-medium hover:underline">
                  {t("me:form-login")}
                </a>
              </Link>
              <span>&middot;</span>
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

export default PasswordResetForm;
