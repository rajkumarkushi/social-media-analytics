"use client";

import { useEffect, useState } from "react";
import { getAnalytics, addAnalytics, downloadCSV, downloadPDF } from "@/lib/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

type AnalyticsData = {
  id: number;
  provider: string;
  followers: number;
  likes: number;
  shares: number;
  created_at: string;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [form, setForm] = useState({
    provider: "",
    followers: 0,
    likes: 0,
    shares: 0,
  });

  const [filters, setFilters] = useState({
    provider: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchAnalytics();
  }, [filters]);

  const fetchAnalytics = async () => {
    try {
      const res = await getAnalytics(filters);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAnalytics(form);
      setForm({ provider: "", followers: 0, likes: 0, shares: 0 });
      fetchAnalytics();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* 🔹 Filter UI */}
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Filters</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={filters.provider}
            onChange={(e) => setFilters({ ...filters, provider: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">All Providers</option>
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="p-2 border rounded"
          />

          <button
            onClick={() => setFilters({ provider: "", startDate: "", endDate: "" })}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 🔹 Add Dummy Data Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg mb-6">
        <input
          type="text"
          placeholder="Provider (YouTube, Instagram...)"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          placeholder="Followers"
          value={form.followers}
          onChange={(e) => setForm({ ...form, followers: +e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          placeholder="Likes"
          value={form.likes}
          onChange={(e) => setForm({ ...form, likes: +e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          placeholder="Shares"
          value={form.shares}
          onChange={(e) => setForm({ ...form, shares: +e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Analytics Data
        </button>
      </form>

      {/* 🔹 Chart */}
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Followers Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_at" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="followers" stroke="#3b82f6" />
            <Line type="monotone" dataKey="likes" stroke="#22c55e" />
            <Line type="monotone" dataKey="shares" stroke="#f59e0b" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Report Download Buttons */}
      <div className="flex gap-4">
        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download CSV
        </button>
        <button
          onClick={downloadPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
