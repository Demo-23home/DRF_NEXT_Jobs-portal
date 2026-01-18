import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const response = await axios.put(
        `${process.env.API_URL}/accounts/user/update/`,
        req.body,
        {
          headers: {
            Authorization: req.headers.authorization || "",
            "Content-Type": "application/json",
          },
        }
      );
      return res.status(response.status).json(response.data);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
