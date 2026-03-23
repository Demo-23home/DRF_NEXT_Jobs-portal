import axios from "axios";

export default async function handler(req, res) {
  const {query: { id }, method,} = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await axios.get(
      `${process.env.API_URL}/jobs/${id}/applied/`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("API ERROR:", error?.response?.data || error.message);

    return res.status(error?.response?.status || 500).json({
      error:
        error?.response?.data?.detail ||
        error?.response?.data ||
        "Internal Server Error",
    });
  }
}