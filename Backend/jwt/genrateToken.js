import jwt from "jsonwebtoken"

const createTokenAndSaveCookie=(userId,res)=>{
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN,{
        expiresIn: "10d",
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
};

export default createTokenAndSaveCookie;