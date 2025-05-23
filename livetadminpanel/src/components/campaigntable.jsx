import { useEffect, useState } from "react";
import axios from "axios";
import CampaignForm from "../components/campaignform";

export default function CampaignTable() {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const fetchCampaigns = () => {
    axios
      .get("http://localhost:5003/api/campaign")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {editingCampaign ? "Edit Campaign" : "Create Campaign"}
        </h2>

        <CampaignForm
          editingCampaign={editingCampaign}
          onSuccess={() => {
            fetchCampaigns();
            setEditingCampaign(null);
          }}
        />

        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Campaigns Overview
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 border-b">Name</th>
                  <th className="px-6 py-4 border-b">Action Type</th>
                  <th className="px-6 py-4 border-b">Pixel URL</th>
                  <th className="px-6 py-4 border-b">Redirect URL</th>
                  <th className="px-6 py-4 border-b">Offer Pages</th>
                  <th className="px-6 py-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {campaigns.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-6 py-4 border-b">{c.name}</td>
                    <td className="px-6 py-4 border-b">{c.actionType}</td>
                    <td className="px-6 py-4 border-b break-all">
                      <a
                        href={c.pixelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {c.pixelUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 border-b break-all">
                      <a
                        href={c.redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {c.redirectUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 border-b">
                      {c.offerPages?.join(", ") || "-"}
                    </td>
                    <td className="px-6 py-4 border-b">
                      <button
                        onClick={() => setEditingCampaign(c)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {campaigns.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-gray-500 border-b"
                    >
                      No campaigns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
