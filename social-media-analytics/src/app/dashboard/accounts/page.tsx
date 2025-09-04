"use client";

import { useEffect, useState } from "react";
import { getAccounts, addAccount, deleteAccount } from "@/lib/api";

type Account = {
  id: number;
  provider: string;
  accountid: string;
  accountname: string;
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({
    provider: "",
    accountId: "",
    accountName: "",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAccount(form);
      setForm({ provider: "", accountId: "", accountName: "" });
      fetchAccounts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAccount(id);
      fetchAccounts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Manage Accounts</h1>

      {/* Add Account Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow ring-1 ring-gray-200 p-6 mb-6">
        <input
          type="text"
          placeholder="Provider (YouTube, Instagram...)"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-4"
          required
        />
        <input
          type="text"
          placeholder="Account ID"
          value={form.accountId}
          onChange={(e) => setForm({ ...form, accountId: e.target.value })}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-4"
          required
        />
        <input
          type="text"
          placeholder="Account Name"
          value={form.accountName}
          onChange={(e) => setForm({ ...form, accountName: e.target.value })}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Add Account
        </button>
      </form>

      {/* Accounts List */}
      <ul className="space-y-4">
        {accounts.map((acc) => (
          <li key={acc.id} className="bg-white rounded-xl shadow ring-1 ring-gray-200 p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">{acc.provider}</div>
              <div className="font-medium">{acc.accountname} <span className="text-gray-500">({acc.accountid})</span></div>
            </div>
            <button
              onClick={() => handleDelete(acc.id)}
              className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 active:bg-red-800 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
