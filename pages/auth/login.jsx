import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";
import Image from "next/image";
import { getCsrfToken } from "next-auth/react";
import { getUserSession } from "../api/site/me";

const LoginPage = ({ csrfToken }) => {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-sm w-full mx-auto">
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
        <div className="bg-white shadow-2xl shadow-th-700/10 rounded-xl p-6">
          <LoginForm csrfToken={csrfToken} />
        </div>
        <div className="mt-4 text-sm text-center text-gray-400">
          &copy; 2022 &middot; canlisu.az
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let user = await getUserSession(context.req, context.res);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: `/`
      }
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      ...(await serverSideTranslations(context?.locale, ["common", "me"]))
    }
  };
}

// LoginPage.Layout = Layout;
export default LoginPage;
