import nextConnect from "next-connect";
import { models } from "../../../db";

const apiRoute = nextConnect({
  attachParams: true,
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

export async function getAllPosts() {
  const posts = await models.blog.findAll({
    include: {
      model: models.blog_lang,
      as: "blog_langs"
    },
    order: [["id", "DESC"]]
  });

  return posts;
}

export async function getSitePost(id, locale) {
  return await models.blog.findOne({
    where: { id: Number(id) },
    raw: true,
    nest: true,
    include: {
      model: models.blog_lang,
      as: "blog_langs",
      where: { lang: locale }
    }
  });
}

export async function getPosts(page, limit = 20) {
  const offset = Number(page) * limit;
  const { count, rows } = await models.blog.findAndCountAll({
    offset,
    limit,
    include: {
      model: models.blog_lang,
      as: "blog_langs"
    },
    // include: {
    //   attributes: ["first_name", "last_name"],
    //   model: models.users,
    //   as: "user"
    // },
    order: [["id", "DESC"]]
  });

  return { count, rows };
}
export async function getPostsSite(lang = "az", page, limit = 20) {
  const offset = Number(page) * limit;
  const { count, rows } = await models.blog.findAndCountAll({
    attributes: { exclude: ["active", "createdAt"] },
    where: { active: 1 },
    offset,
    limit,
    nest: true,
    raw: true,
    include: {
      attributes: { exclude: ["body", "id", "rid", "lang"] },
      model: models.blog_lang,
      as: "blog_langs",
      where: { lang }
    },

    order: [["id", "DESC"]]
  });

  return { count, rows };
}

apiRoute.get(async (req, res) => {
  const posts = await getPosts();
  res.status(200).json(posts);
});

export default apiRoute;
