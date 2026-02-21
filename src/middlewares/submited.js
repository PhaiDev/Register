import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.connect().catch(console.error);

export const sessionSetting = session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24
  }
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

export const checkSubmit = (req , res ,next) => {
    if(req.session?.isSubmitted){
        return next();
    }else{
        res.redirect("/register");
    }
};

