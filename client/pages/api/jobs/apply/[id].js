import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const token = req.cookies.access;

    const response = await axios.post(
      `${process.env.API_URL}/jobs/apply/${id}/`,
      {},
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data;

    // Forward the full Django error body as-is
    if (data && typeof data === "object") {
      return res.status(status).json(data);
    }

    return res.status(status).json({ error: "Something went wrong" });
  }
}