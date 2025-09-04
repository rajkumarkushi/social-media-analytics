import app from "./app.js";
import adminRoutes from "./routes/adminRoutes.js";

const PORT = process.env.PORT || 5000;

app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
