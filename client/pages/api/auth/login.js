import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    // Send credentials to Django backend
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/login/`,
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const token = response.data?.access;

    // If token missing → invalid login
    if (!token) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    // Set HttpOnly access token cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 15, // 15 days
        sameSite: "Lax",
        path: "/",
      })
    );

    return res.status(200).json({
      access: token,
      message: "Login successful",
    });
  } catch (error) {
    console.log("API ERROR:", error.response?.data.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message,
    });
  }
}
