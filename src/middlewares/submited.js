import session from "express-session";
import {RedisStore} from "connect-redis";
import { createClient } from "redis";
import { config } from '../config/env.js';

// Setup Redis Client for Production Session
let redisClient;
let storeOptions = {}; // default memory store

if (config.redisUrl) {
  redisClient = createClient({ url: config.redisUrl });

  redisClient.on("connect", () => {
    console.log("✅ Redis connected");
  });
  redisClient.connect().catch(console.error);

  storeOptions = { store: new RedisStore({ client: redisClient, prefix: "nrnova:" }) };
  console.log("Redis cache enabled for sessions");
} else {
  console.warn("⚠️ REDIS_URL not found, falling back to MemoryStore (NOT for production)");
}

export const sessionSetting = session({
  ...storeOptions,
  secret: config.sessionSecret || "isSubmit123", // fallback for dev
  resave: false,
  saveUninitialized: false, // Don't create session until something stored
  cookie: {
    secure: config.nodeEnv === 'production', // true if on HTTPS (Railway provides HTTPS)
    httpOnly: true, // Prevent client JS reading cookie
    sameSite: 'lax', // mitigate CSRF
    maxAge: 1000 * 60 * 60 * 24 // 24 hours expiry
  }
});

export const checkSubmit = (req, res, next) => {
  if (req.session?.isSubmitted) {
    return next();
  } else {
    res.redirect("/register");
  }
};
