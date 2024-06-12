import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "@/components/Layout/PageHead";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
// import dompurify from "dompurify";
import { getPage } from "./api/site/about";
import Head from "next/head";
const AboutPage = ({ page }) => {
  const { t } = useTranslation();
  // const sanitizer = dompurify.sanitize;
  const body = stateToHTML(convertFromRaw(JSON.parse(page.pages_langs.body)));

  return (
    <div>
      <PageHead
        data={{
          title: t("common:nav-link-about")
        }}
      />
      <Head>
        <title>{t("common:nav-link-about")}</title>
      </Head>
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        className="container max-w-screen-md mx-auto pb-16 mt-4 px-4  prose"
      ></div>
    </div>
  );
};

// export const getStaticProps = async ({ locale }) => {
//   const _res = await fetch(
//     `${process.env.API_PATH}/api/site/about?locale=${locale}`
//   );
//   const result = await _res.json();

//   return {
//     props: {
//       result,
//       ...(await serverSideTranslations(locale, ["common", "home"]))
//     }
//   };
// };

export async function getServerSideProps({ locale }) {
  const page = await getPage(locale);

  if (!page) {
    return {
      notFound: true
    };
  }

  return {
    props: { page, ...(await serverSideTranslations(locale, ["common"])) }
  };
}

AboutPage.Layout = Layout;
export default AboutPage;
