import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { authorization } = req.headers;

    const response = await axios.post(
      `${process.env.API_URL}/jobs/new/`,
      req.body,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Something went wrong",
    });
  }
}