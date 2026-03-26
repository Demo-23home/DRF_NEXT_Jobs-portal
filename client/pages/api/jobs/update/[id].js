import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { authorization } = req.headers;

    const response = await axios.put(
      `${process.env.API_URL}/jobs/update/${id}/`,
      req.body,
      {
        headers: {
          Authorization: authorization,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Something went wrong" });
  }
}
