import session from 'express-session';

export const sessionSetting = session({
    secret: "isSubmit123",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
})

export const checkSubmit = (req , res ,next) => {
    if(req.session?.isSubmitted){
        return next();
    }else{
        res.redirect("/register");
    }
};

