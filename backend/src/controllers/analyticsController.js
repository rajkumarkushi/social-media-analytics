import { addAnalyticsService, getAnalyticsService } from "../services/analyticsService.js";

export const addAnalytics = async (req, res) => {
  try {
    console.log("Incoming Analytics Data:", req.body);
    console.log("User:", req.user);

    const { provider, followers, likes, shares } = req.body;

    if (!provider || !followers) {
      return res.status(400).json({ message: "Provider and followers are required" });
    }

    const result = await addAnalyticsService(req.user.id, {
      provider,
      followers,
      likes,
      shares,
    });

    res.json(result);
  } catch (err) {
    console.error("Add Analytics Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { provider, startDate, endDate } = req.query;

    // Call service
    const result = await getAnalyticsService(req.user.id);

    let filtered = result;
    if (provider) {
      filtered = filtered.filter((a) => a.provider === provider);
    }
    if (startDate) {
      filtered = filtered.filter((a) => new Date(a.created_at) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((a) => new Date(a.created_at) <= new Date(endDate));
    }

    res.json(filtered);
  } catch (err) {
    console.error("Get Analytics Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
