import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

export const createReport = async (req, res) => {
  try {
    const { tanggal, tempat, angpao, biaya } = req.body;
    const userId = req.user.id;

    const result = await db.query(
      `INSERT INTO reports (user_id, tanggal, tempat, angpao, biaya)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [userId, tanggal, tempat, angpao, biaya]
    );

    const report = result.rows[0];

    const uploadPromises = req.files.map(async (file) => {
      const base64 = file.buffer.toString("base64");
      const dataURI = `data:${file.mimetype};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "reports",
        resource_type: "auto",
        public_id: `${tempat}-${Date.now()}`
      });

      await db.query(
        `INSERT INTO media (report_id, url, type)
         VALUES ($1,$2,$3)`,
        [
          report.id,
          uploadResult.secure_url,
          uploadResult.resource_type
        ]
      );
    });

    await Promise.all(uploadPromises);

    res.json({ message: "Upload berhasil" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
