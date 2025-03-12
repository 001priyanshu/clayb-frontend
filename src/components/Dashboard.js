import React, { useState, useRef, useEffect, useCallback } from "react";
import Tour from "./Tour";
import SideBar from "./SideBars";
import CampaignDetails from "./CampaignDetails";
import HelpCard from "./HelpCard";
import CampaignCard from "./CampaignCard";
import { fetchCampaigns, createNewCampaign, fetchTourStep } from "../apis/tourApis";
import CampaignData from "./CampaignData";

const Dashboard = ({ tourActive, setTourActive, pageId, featureId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [tour, setTour] = useState({
    active: false,
    step: 0
  });
  const [show, setShow] = useState(null);
  const createButtonRef = useRef(null);
  const criteriaFormRef = useRef(null);
  const launchButtonRef = useRef(null);
  const campaignNameRef = useRef(null);

  const referenceMapping = {
    createButtonRef: createButtonRef,
    criteriaFormRef: criteriaFormRef,
    launchButtonRef: launchButtonRef,
    campaignNameRef: campaignNameRef,
  };

  useEffect(() => {

    const loadCampaigns = async () => {
      setLoading(true);
      const data = await fetchCampaigns();
      setCampaigns(data);
      setLoading(false);
    };

    loadCampaigns();
  }, [creating]);

  const startTour = useCallback(async (pageId = "dashboard", featureId = "create-campaign", step = -1) => {
    const { currentStep } = await fetchTourStep(pageId, featureId, step);
    const newTargetRef = currentStep.targetRef;
    let newShow = {
      ...currentStep,
      targetRef: referenceMapping[newTargetRef]
    };
    setShow(newShow);
    setTour({ active: true, step: currentStep.step });
  }, [referenceMapping]);

  useEffect(() => {
    if (tourActive) {
      startTour(pageId, featureId);
      setTourActive(false);
    }
  }, [tourActive, pageId, featureId, setTourActive, startTour]);

  const endTour = () => setTour({ active: false, step: 0 });
  const nextStep = async () => {
    let { currentStep, completed } = await fetchTourStep("dashboard", "create-campaign", tour.step);
    if (!completed) {
      const newTargetRef = currentStep.targetRef;
      let newShow = {
        ...currentStep,
        targetRef: referenceMapping[newTargetRef]
      }
      setShow(newShow);
      setTour({ ...tour, step: currentStep.step });
    } else {
      endTour();
    }
  };
  const prevStep = async () => {
    let prev = tour.step - 2;
    if(prev < -1) prev = -1;
    let { currentStep, completed } = await fetchTourStep("dashboard", "create-campaign", prev);
    if (!completed) {
      const newTargetRef = currentStep.targetRef;
      let newShow = {
        ...currentStep,
        targetRef: referenceMapping[newTargetRef]
      }
      setShow(newShow);
      setTour({ ...tour, step: currentStep.step });
    } else {
      endTour();
    }
  };

  const createCampaign = async () => {
    setCreating(true);
    try {
      const newCampaign = await createNewCampaign();
      setCampaigns((prev) => [...prev, newCampaign]);
    } catch (error) {
      console.error("Error creating campaign", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
      <Tour
        active={tour.active}
        onClose={endTour}
        onNext={nextStep}
        onPrev={prevStep}
        show={show}
      />

      <div className="flex">
        <SideBar />

        <div className="flex-1 p-6">
          {<div className="mb-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Marketing Dashboard</h1>
          </div>}

          <CampaignDetails />
          <CampaignCard />
          <div className="flex gap-6">
            <div className="flex-1">
              <CampaignData
                loading={loading}
                campaigns={campaigns}
              />
              <div
                className={`bg-white rounded-lg shadow-sm p-4 ${tour.active && tour.step === 0 ? "z-30" : tour.ƒƒƒactive ? "opacity-50" : ""
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Ready to grow your audience?</h3>
                    <p className="text-xs text-gray-500">Start by creating a new campaign</p>
                  </div>
                  <button
                    ref={createButtonRef}
                    className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
                    onClick={createCampaign}
                    disabled={creating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {creating ? "Creating..." : "Create Campaign"}
                  </button>
                </div>
              </div>
              <div
                className={`bg-white rounded-lg shadow-sm p-4 mt-4 ${tour.active && tour.step === 1 ? "z-30" : tour.active ? "opacity-50" : ""
                  }`}
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">Campaign Name</h3>
                <p className="text-xs text-gray-500 mb-3">Choose a name that reflects your campaign goals</p>
                <div ref={campaignNameRef} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Campaign Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., Summer 2025 Product Launch"
                    />
                  </div>
                  <button className="w-full bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors">
                    Save Campaign Name
                  </button>
                </div>
              </div>
            </div>

            <div className="w-80">
              <div
                className={`bg-white p-4 rounded-lg shadow-sm mb-4 ${tour.active && tour.step === 2 ? "z-30" : tour.active ? "opacity-50" : ""
                  }`}
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select Criteria</h3>
                <p className="text-xs text-gray-500 mb-3">Define audience based on demographics</p>
                <div ref={criteriaFormRef} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Age Range</label>
                    <div className="relative">
                      <select className="appearance-none w-full border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500">
                        <option>18-24</option>
                        <option>25-34</option>
                        <option>35-44</option>
                        <option>45+</option>
                      </select>
                      <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors">
                    Apply Criteria
                  </button>
                </div>
              </div>
              <div className="w-80">
                <div
                  className={`bg-white p-4 rounded-lg shadow-sm mb-4 ${tour.active && tour.step === 3 ? "z-30" : tour.active ? "opacity-50" : ""
                    }`}
                >
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Review & Launch</h3>
                  <p className="text-xs text-gray-500 mb-3">Review campaign settings before launch</p>

                  <div className="bg-gray-50 p-2 rounded mb-3 text-xs max-h-40 overflow-auto">
                    <p className="text-gray-500">Campaign summary will appear here</p>
                  </div>
                  <div className="flex justify-end sticky bottom-0 bg-white p-2 shadow-lg rounded-lg">
                    <button
                      ref={launchButtonRef}
                      className="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-purple-700 transition-colors w-full"
                    >
                      Launch Campaign
                    </button>
                  </div>
                </div>
              </div>
              <HelpCard />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
