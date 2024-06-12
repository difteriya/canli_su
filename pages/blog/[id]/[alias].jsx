import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "@/components/Layout/PageHead";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Image from "next/image";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon
} from "react-share";
import { getSitePost } from "../../api/blog";
import Head from "next/head";

const BlogItem = ({ post }) => {
  const { t } = useTranslation();
  const { title, subtitle, body } = post.blog_langs;
  const router = useRouter();

  const htmlBody = stateToHTML(convertFromRaw(JSON.parse(body)));
  const shareUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}${router.asPath}`;
  const postDate = new Date(post.updatedAt).toLocaleDateString("en-GB");
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </Head>
      <PageHead
        data={{
          title: title,
          breadcrumbs: [
            { label: t("common:nav-link-blog"), href: "/blog" },
            { label: title }
          ]
        }}
      />

      <div className="container max-w-screen-md mx-auto pb-16 mt-4 px-4  prose">
        <div className="border-b flex justify-between items-center pb-4">
          <div className="flex items-center justify-start gap-3">
            <div className="text-gray-500 text-sm">
              {t("common:product-share")}:
            </div>
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={24} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={24} round />
            </TwitterShareButton>
            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={24} round />
            </TelegramShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={24} round />
            </WhatsappShareButton>
          </div>
          <div className="text-sm  text-gray-500">
            <span>{postDate}</span>
          </div>
        </div>
        <p>{subtitle}</p>
        <div className="relative  rounded overflow-hidden">
          <Image
               src={`${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/${post.photo}`}
            alt={title}
            className="object-contain object-center"
            width={736}
            height={450}
            quality="100"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </div>
    </div>
  );
};

// export async function getStaticPaths({ locales }) {
//   // const res = await fetch("https://.../posts");
//   // const posts = await res.json();

//   const posts = await getAllPosts();
//   // Get the paths we want to pre-render based on posts

//   let paths = [];
//   console.log(posts);
//   posts.forEach(({ id, blog_langs }) => {
//     for (const locale of locales) {
//       const alias = blog_langs.find((p) => p.lang === locale)?.alias;
//       paths.push({
//         params: {
//           id: `${id}`,
//           alias
//         },
//         locale
//       });
//     }
//   });

//   return { paths, fallback: "blocking" };
// }

export async function getServerSideProps({ locale, params }) {
  const { id } = params;
  const post = await getSitePost(id, locale);

  if (!post) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
}

BlogItem.Layout = Layout;
export default BlogItem;
