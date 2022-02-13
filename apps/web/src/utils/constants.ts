module.exports = {
    SESSION_OPTIONS: {
        password: process.env.SESSION_PASSWORD,
        cookieName: "session",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    }
}