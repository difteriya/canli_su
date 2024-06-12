import Head from "next/head";
import Layout from "@/components/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getHome } from "./api/site/home";
import Banner from "@/components/Home/Banner";
import Advantage from "@/components/Home/Advantage";
import Products from "@/components/Home/Products";
import Composition from "@/components/Home/Composition";
import Delivery from "@/components/Home/Delivery";
import Calculator from "@/components/Home/Calculator";

export default function Home({ slider, composition, products }) {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t("home:title")}</title>
        <meta name="description" content={t("home:description")} />
      </Head>

      <Banner slider={slider} />
      <Advantage />
      <svg
        viewBox="0 0 960 80"
        className="text-gray-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13L20 11.2C40 9.3 80 5.7 120 7.8C160 10 200 18 240 26.3C280 34.7 320 43.3 360 51.2C400 59 440 66 480 64.7C520 63.3 560 53.7 600 43.2C640 32.7 680 21.3 720 15.2C760 9 800 8 840 19.2C880 30.3 920 53.7 940 65.3L960 77L960 0L940 0C920 0 880 0 840 0C800 0 760 0 720 0C680 0 640 0 600 0C560 0 520 0 480 0C440 0 400 0 360 0C320 0 280 0 240 0C200 0 160 0 120 0C80 0 40 0 20 0L0 0Z"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="miter"
        ></path>
      </svg>
      <Products data={products} />
      <svg
        viewBox="0 0 960 80"
        className="text-gray-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13L20 11.2C40 9.3 80 5.7 120 7.8C160 10 200 18 240 26.3C280 34.7 320 43.3 360 51.2C400 59 440 66 480 64.7C520 63.3 560 53.7 600 43.2C640 32.7 680 21.3 720 15.2C760 9 800 8 840 19.2C880 30.3 920 53.7 940 65.3L960 77L960 0L940 0C920 0 880 0 840 0C800 0 760 0 720 0C680 0 640 0 600 0C560 0 520 0 480 0C440 0 400 0 360 0C320 0 280 0 240 0C200 0 160 0 120 0C80 0 40 0 20 0L0 0Z"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="miter"
        ></path>
      </svg>
      <Composition composition={composition} />
      <svg
        viewBox="0 0 960 80"
        className="text-th-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13L20 11.2C40 9.3 80 5.7 120 7.8C160 10 200 18 240 26.3C280 34.7 320 43.3 360 51.2C400 59 440 66 480 64.7C520 63.3 560 53.7 600 43.2C640 32.7 680 21.3 720 15.2C760 9 800 8 840 19.2C880 30.3 920 53.7 940 65.3L960 77L960 0L940 0C920 0 880 0 840 0C800 0 760 0 720 0C680 0 640 0 600 0C560 0 520 0 480 0C440 0 400 0 360 0C320 0 280 0 240 0C200 0 160 0 120 0C80 0 40 0 20 0L0 0Z"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="miter"
        ></path>
      </svg>
      <Calculator />
      <svg
        className="text-gray-50"
        viewBox="0 0 900 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0 32L13.7 29.7C27.3 27.3 54.7 22.7 82 23.5C109.3 24.3 136.7 30.7 163.8 33.3C191 36 218 35 245.2 31.8C272.3 28.7 299.7 23.3 327 20.3C354.3 17.3 381.7 16.7 409 19.7C436.3 22.7 463.7 29.3 491 33.3C518.3 37.3 545.7 38.7 573 39.3C600.3 40 627.7 40 654.8 36.2C682 32.3 709 24.7 736.2 23.3C763.3 22 790.7 27 818 30.3C845.3 33.7 872.7 35.3 886.3 36.2L900 37L900 61L886.3 61C872.7 61 845.3 61 818 61C790.7 61 763.3 61 736.2 61C709 61 682 61 654.8 61C627.7 61 600.3 61 573 61C545.7 61 518.3 61 491 61C463.7 61 436.3 61 409 61C381.7 61 354.3 61 327 61C299.7 61 272.3 61 245.2 61C218 61 191 61 163.8 61C136.7 61 109.3 61 82 61C54.7 61 27.3 61 13.7 61L0 61Z"
          strokeLinecap="round"
          strokeLinejoin="miter"
        ></path>
      </svg>
      <Delivery />
    </div>
  );
}

export const getServerSideProps = async ({ locale }) => {
  const { slider, composition, products } = await getHome(locale);

  return {
    props: {
      slider,
      composition,
      products,
      ...(await serverSideTranslations(locale, ["common", "home"]))
    }
  };
};

Home.Layout = Layout;
