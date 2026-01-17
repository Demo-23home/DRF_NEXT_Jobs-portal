import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookies = cookie.parse(req.headers.cookie || {});

  const access = cookies.access || false;

  if (!access) {
    return res.stats(401).json({
      error: "Login First to load user",
    });
  }

  try {
    // Send credentials to Django backend
    const response = await axios.get(`${process.env.API_URL}/accounts/user/`, {
      headers: { Authorization: `Bearer ${access}` },
    });

    if (response.data) {
      return res.status(200).json({
        user: response.data,
      });
    }
  } catch (error) {
    res.status(error.response.status).json({
      error: "Something went wrong  while retrieving user data",
    });
  }
}
