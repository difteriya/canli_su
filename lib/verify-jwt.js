import passport from "passport";
import httpStatus from "http-status";
import ApiError from "./api-error";



const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => {
      return next(err);
    });
};

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(
      new ApiError(
        httpStatus.UNAUTHORIZED,
        "You have been signed out. Please sign in again."
      )
    );
  }
  req.user = user;
  resolve();
};


export default auth;
