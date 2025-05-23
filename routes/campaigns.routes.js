const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
  getCampaignByOffer,
} = require("../controllers/campaigns.controller");

// Create a new campaign
router.post("/", createCampaign);

// Get all campaigns
router.get("/", getAllCampaigns);

// Get campaign by ID
router.get("/:id", getCampaignById);

// Get campaign by offer
router.get("/offer/:offer", getCampaignByOffer);

// Update campaign by ID
router.put("/:id", updateCampaignById);

// Delete campaign by ID
router.delete("/:id", deleteCampaignById);

module.exports = router;
