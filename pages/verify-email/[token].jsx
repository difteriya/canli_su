import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { verifyEmail } from "../api/auth/register";
import { Check, X, Clock } from "react-feather";
import { useTranslation } from "next-i18next";
import axios from "axios";

const VerifyEmail = ({ status, uid }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const resendLink = async () => {
    try {
      const res = await axios.post(
        `/api/account?c=resend-verification-link`,
        { uid },
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        router.push("/verify-email");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          {status === "verified" && (
            <>
              <div className=" bg-green-100 flex justify-center items-center w-16 h-16 rounded-full mb-4 ">
                <Check size={48} className="text-green-500" />
              </div>
              <h1 className="text-2xl mb-2 font-semibold">
                {t("me:ev-verified-title")}
              </h1>
              <p className="mb-4">{t("me:ev-verified-desc")}</p>
              <Link href="/">
                <a className="text-th-600 mt-6 font-medium text-sm hover:underline">
                  {t("common:nav-link-home")}
                </a>
              </Link>
            </>
          )}
          {status === "expired" && (
            <>
              <div className=" bg-orange-100 flex justify-center items-center w-16 h-16 rounded-full mb-4 ">
                <Clock size={48} className="text-orange-500" />
              </div>
              <h1 className="text-2xl mb-2 font-semibold">
                {t("me:ev-expired-title")}
              </h1>
              <p className="mb-4">{t("me:ev-expired-desc")}</p>

              <button
                onClick={resendLink}
                className="flex  disabled:bg-gray-200 disabled:text-gray-500 items-center justify-center rounded-[5px] text-sm border border-transparent bg-th-700 px-6 py-3 font-semibold text-white hover:bg-th-700/80"
              >
                {t("me:ev-expired-resend-btn")}
              </button>
            </>
          )}
          {status === "invalid" && (
            <>
              <div className=" bg-red-100 flex justify-center items-center w-16 h-16 rounded-full mb-4 ">
                <X size={48} className="text-red-500" />
              </div>
              <h1 className="text-2xl mb-2 font-semibold">
                {t("me:ev-invalid-title")}
              </h1>
              <p className="mb-4">{t("me:ev-invalid-desc")}</p>
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
  const { status, user_id } = await verifyEmail(params.token);
  console.log("user_id", user_id);
  return {
    props: {
      status,
      uid: !!user_id ? user_id : 0,
      ...(await serverSideTranslations(locale, ["common", "me"]))
    }
  };
};

export default VerifyEmail;
