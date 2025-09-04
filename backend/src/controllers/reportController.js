import pool from "../config/db.js";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";

// 📌 Export CSV
export const exportCSV = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT provider, followers, likes, shares, created_at FROM analytics WHERE user_id = $1 ORDER BY created_at ASC",
      [req.user.id]
    );

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(result.rows);

    res.header("Content-Type", "text/csv");
    res.attachment("analytics_report.csv");
    res.send(csv);
  } catch (err) {
    console.error("CSV Export Error:", err.message);
    res.status(500).json({ message: "Failed to export CSV" });
  }
};

// 📌 Export PDF
export const exportPDF = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT provider, followers, likes, shares, created_at FROM analytics WHERE user_id = $1 ORDER BY created_at ASC",
      [req.user.id]
    );

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=analytics_report.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("Analytics Report", { align: "center" });
    doc.moveDown();

    result.rows.forEach((row, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ${row.provider} - Followers: ${row.followers}, Likes: ${row.likes}, Shares: ${row.shares}, Date: ${row.created_at}`
      );
    });

    doc.end();
  } catch (err) {
    console.error("PDF Export Error:", err.message);
    res.status(500).json({ message: "Failed to export PDF" });
  }
};
