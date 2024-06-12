import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout";
import Image from "next/image";

const VerifyEmail = () => {
  return (
    <div className="p-10 mx-auto max-w-md flex flex-col items-center justify-center text-center">
      <Image width={64} height={64} alt="mail" src="/message2.png" />
      <h1 className="text-2xl my-4 font-semibold">
        Password reset link sended
      </h1>
      <p>Check email</p>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
};

VerifyEmail.Layout = Layout;
export default VerifyEmail;
