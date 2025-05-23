import { useState, useEffect } from "react";
import axios from "axios";
import CampaignForm from "../components/campaignform";

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/campaign");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDelete = async (campaignId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5003/api/campaign/${campaignId}`);
      fetchCampaigns();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete campaign. Please try again.");
    }
  };

  const handleSuccess = () => {
    setEditingCampaign(null);
    setIsModalOpen(false);
    fetchCampaigns();
  };

  const handleClose = () => {
    setEditingCampaign(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">Campaign Manager</h1>
          <p className="text-gray-500 mt-1">Edit redirect URLs for your campaigns.</p>
        </header>

        <section className="bg-white shadow-xl rounded-2xl mb-12 border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-200">
              <thead className="bg-gray-100 text-xs font-medium text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Offer Page</th>
                  <th className="px-6 py-3 text-left">Pixel URL</th>
                  <th className="px-6 py-3 text-left">Redirect URL</th>
                  <th className="px-6 py-4 text-left">Edit | Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {campaigns.length ? (
                  campaigns.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800 capitalize">
                        {c.offerPages?.includes("offer1")
                          ? "Offer Page 1"
                          : c.offerPages?.includes("offer2")
                          ? "Offer Page 2"
                          : "—"}
                      </td>
                      <td className="px-6 py-4 max-w-xs break-words text-blue-600">
                        {c.pixelUrl}
                      </td>
                      <td className="px-6 py-4 max-w-xs break-words text-green-600">
                        {c.redirectUrl}
                      </td>
                      <td className="px-6 py-4 space-x-4">
                        <button
                          onClick={() => handleEdit(c)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-600 hover:text-red-800 font-medium transition mt-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400 font-medium">
                      No campaigns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl font-bold transition"
                aria-label="Close modal"
              >
                ×
              </button>
              <CampaignForm editingCampaign={editingCampaign} onSuccess={handleSuccess} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
