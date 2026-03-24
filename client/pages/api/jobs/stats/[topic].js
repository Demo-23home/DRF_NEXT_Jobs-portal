import axios from "axios";

export default async function handler(req, res) {
  const {
    query: { topic },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}/jobs/stats/${topic}/`,
      {},
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
