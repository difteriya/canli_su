import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Image from "next/image";
import { X, Clock } from "react-feather";
import { useTranslation } from "next-i18next";
import { verifyToken } from "../../lib/email";
import PasswordResetForm from "@/components/auth/PasswordResetForm";

const ResetPassword = ({ status, user_id }) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full mx-auto">
        <Link href="/">
          <a className="flex items-center shrink-0 mb-6 justify-center">
            <Image
              className="hover:opacity-75   cursor-pointer transition-all object-contain object-left duration-200"
              src="/logo.png"
              alt="logo"
              width={160}
              height={40}
            />
          </a>
        </Link>

        <div className="bg-white shadow-2xl shadow-th-700/10 rounded-xl p-6 md:p-10 flex flex-col items-center justify-center text-center">
          {status === "success" && <PasswordResetForm uid={user_id} />}
          {status === "expired" && (
            <>
              <div className=" bg-orange-100 flex justify-center items-center w-16 h-16 rounded-full mb-4 ">
                <Clock size={48} className="text-orange-500" />
              </div>
              <h1 className="text-2xl mb-2 font-semibold">
                {t("me:pr-expired-title")}
              </h1>
              <p className="mb-4">{t("me:pr-expired-desc")}</p>
              <Link href="/auth/forgot-password">
                <a className="text-th-600 font-medium text-sm hover:underline">
                  {t("me:pr-expired-btn")}
                </a>
              </Link>
            </>
          )}
          {status === "invalid" && (
            <>
              <div className=" bg-red-100 flex justify-center items-center w-16 h-16 rounded-full mb-4 ">
                <X size={48} className="text-red-500" />
              </div>
              <h1 className="text-2xl mb-2 font-semibold">
                {t("me:pr-invalid-title")}
              </h1>
              <p className="mb-4"> {t("me:pr-invalid-desc")}</p>
            </>
          )}
        </div>

        <div className="mt-4 text-sm text-center text-gray-400">
          &copy; 2022 &middot; canlisu.az
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale, params }) => {
  if (!params?.token) {
    return {
      notFound: true
    };
  }
  const { payload, status } = await verifyToken(params.token);

  return {
    props: {
      status,
      user_id: payload ? payload.sub : 0,
      ...(await serverSideTranslations(locale, ["common", "me"]))
    }
  };
};

export default ResetPassword;
