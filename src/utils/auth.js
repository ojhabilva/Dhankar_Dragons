import jwt from "jsonwebtoken";

export const verifyAdmin = (req) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.role === "admin";
    } catch {
        return false;
    }
};
