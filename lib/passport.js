import { Strategy } from "passport-jwt";
import db from "../db";
import { getLoginSession } from "./auth";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

const extractFromCookie = (req) => getLoginSession(req);

const jwtStrategyOptions = {
  jwtFromRequest: extractFromCookie,
  secretOrKey: JWT_SECRET,
  jsonWebTokenOptions: {
    expiresIn: JWT_EXPIRATION_TIME
  },
  passReqToCallback: true
};

export default new Strategy(jwtStrategyOptions, async (payload, done) => {
  try {
    const user = await db.models.user.findByPk(payload.uid);

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
