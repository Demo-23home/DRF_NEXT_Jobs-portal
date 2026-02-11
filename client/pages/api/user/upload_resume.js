import axios from "axios";
import { IncomingForm } from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      multiples: false,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        return res.status(400).json({ error: "Failed to parse form data" });
      }

      const file = Array.isArray(files.resume)
        ? files.resume[0]
        : files.resume;

      if (!file || !file.filepath) {
        return res.status(400).json({ error: "No valid file uploaded" });
      }

      const accessToken = req.headers.authorization?.replace("Bearer ", "");
      if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/upload-resume/`;

      const formData = new FormData();
      formData.append(
        "resume",
        fs.createReadStream(file.filepath),
        file.originalFilename
      );

      const response = await axios.post(backendUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
          Authorization: `Bearer ${accessToken}`, 
          ...formData.getHeaders(),
        },
      });

      return res.status(200).json(response.data);
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error:
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Something went wrong",
    });
  }
}
