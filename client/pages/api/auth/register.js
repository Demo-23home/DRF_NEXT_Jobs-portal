import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/accounts/signup/`,
        req.body
      );

      return res.status(response.status).json({
        user: response.data.user,
      });
    } catch (error) {
      console.log("REGISTER API ERROR:", error.response?.data, error.message);

      return res.status(error.response?.status || 500).json({
        error: error.response?.data || "Something went wrong",
      });
    }
  }
}
