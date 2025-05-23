const Campaign = require("../models/campaigns.model");

// Create new campaign
// Create new campaign
const createCampaign = async (req, res) => {
  try {
    const { name, pixelUrl, redirectUrl, actionType, offerPages } = req.body;

    if (
      !name ||
      !actionType ||
      !["pixel", "redirect", "both"].includes(actionType)
    ) {
      return res.status(400).send("Missing or invalid fields");
    }

    // offerPages is optional but should be an array of strings if provided
    const campaign = new Campaign({
      name,
      pixelUrl,
      redirectUrl,
      actionType,
      offerPages,
    });
    const saved = await campaign.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update campaign by ID
const updateCampaignById = async (req, res) => {
  try {
    const { name, pixelUrl, redirectUrl, actionType, offerPages } = req.body;

    if (actionType && !["pixel", "redirect", "both"].includes(actionType)) {
      return res.status(400).send("Invalid actionType");
    }

    const updated = await Campaign.findByIdAndUpdate(
      req.params.id,
      { name, pixelUrl, redirectUrl, actionType, offerPages },
      { new: true }
    );

    if (!updated) return res.status(404).send("Campaign not found");
    res.json(updated);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send("Campaign not found");
    res.json(campaign);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete campaign by ID
const deleteCampaignById = async (req, res) => {
  try {
    const deleted = await Campaign.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Campaign not found");
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get active campaign by offer page
const getCampaignByOffer = async (req, res) => {
  try {
    const { offer } = req.params;
    const campaign = await Campaign.findOne({ offerPages: offer }).sort({
      createdAt: -1,
    });
    if (!campaign)
      return res.status(404).send("No campaign assigned to this offer");
    res.json(campaign);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
  getCampaignByOffer,
};
