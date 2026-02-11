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
      },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Something went wrong",
    });
  }
}
