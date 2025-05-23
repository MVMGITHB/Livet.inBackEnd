import { useState, useEffect } from "react";
import axios from "axios";

export default function CampaignForm({ editingCampaign, onSuccess }) {
  const [form, setForm] = useState({
    redirectUrl: "",
    pixelUrl: "",
  });

  useEffect(() => {
    if (editingCampaign) {
      setForm({
        redirectUrl: editingCampaign.redirectUrl || "",
        pixelUrl: editingCampaign.pixelUrl || "",
      });
    }
  }, [editingCampaign]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5003/api/campaign/${editingCampaign._id}`;
      await axios.put(url, {
        ...editingCampaign,
        redirectUrl: form.redirectUrl,
      });
      alert("✅ Campaign updated successfully!");
      onSuccess?.();
    } catch (err) {
      alert("❌ Error: " + (err?.response?.data || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Edit Redirect URL for{" "}
        {editingCampaign.offerPages?.includes("offer1")
          ? "Offer Page 1"
          : editingCampaign.offerPages?.includes("offer2")
          ? "Offer Page 2"
          : "Unknown Offer"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pixel URL (read-only)
        </label>
        <input
          type="text"
          name="pixelUrl"
          value={form.pixelUrl}
          disabled
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Redirect URL
        </label>
        <input
          type="url"
          name="redirectUrl"
          value={form.redirectUrl}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
        >
          Update Redirect
        </button>
      </div>
    </form>
  );
}
