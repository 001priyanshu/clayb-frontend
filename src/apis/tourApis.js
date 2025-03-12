import axios from "axios";

const API_BASE_URL = "https://calyb-backend-2.onrender.com/api";

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campaigns`);
    const resp = response.data;
    return resp.data;
  } catch (error) {
    console.error("Error fetching campaigns", error);
    return [];
  }
};

export const createNewCampaign = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns`);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign", error);
    throw error;
  }
};


export const fetchTourStep = async ( pageId, featureId, currentStep = -1) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tours/next-step`, {
      pageId: "dashboard",
      featureId: "create-campaign",
      currentStep,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tour step", error);
    throw error;
  }
};

export const sendChatMessage = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tours/message`, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending chat message", error);
    throw error;
  }
};