import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //PREVENT XSS ATTACKS ,not accessible by js
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict", 
    secure : process.env.NODE_ENV !== "development"
  });
  console.log("generated token = ",token)
};
export default generateTokenAndSetCookie;
