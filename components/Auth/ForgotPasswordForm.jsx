import { useRef } from "react";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-hot-toast";


const ForgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("me:form-field-required")
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const recaptchaRef = useRef();

  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const token = await recaptchaRef.current.executeAsync();
      console.log(token);
      if (token) {
        const res = await axios.post(`/api/account?c=password-reset`, values, {
          withCredentials: true
        });
        if (res.status === 200) {
          if (res.data.type === "field-error") {
            setErrors(res.data.message);
          } else {
            toast.success(t("common:form-message-sended"));
            resetForm();
          }

          setTimeout(() => recaptchaRef.current.reset(), 500);
        }
      }
      await setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {t("me:reset-your-password")}
      </h1>
      <p className="text-sm mb-4">{t("me:reset-pass-desc")}</p>

      <Formik
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: ""
        }}
        validationSchema={ForgotPasswordFormSchema}
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
              <Field
                className="f-input"
                type="email"
                name="email"
                placeholder={t("me:form-email")}
              />
              <ErrorMessage
                render={(msg) => <div className="f-error">{t(msg)}</div>}
                name="email"
              />
            </div>

            <button
              disabled={isSubmitting}
              className="flex w-full disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-th-700/80"
              type="submit"
            >
              {isSubmitting ? "Loading..." : t("me:reset-your-password")}
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

export default ForgotPasswordForm;
