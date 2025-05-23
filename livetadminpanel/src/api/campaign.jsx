import axios from "axios";

const API = "http://localhost:5003/api/campaign";

export const getCampaigns = () => axios.get(API);
export const createCampaign = (data) => axios.post(API, data);
