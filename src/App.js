import React, { useState } from "react";
import ChatBot from "./components/ChatBot";


import Dashboard from "./components/Dashboard";

function App() {
  const [tourActive, setTourActive] = useState(false);
  const [pageId, setPageId] = useState();
  const [featureId, setFeatureId] = useState();

  const startTour = () => {
    setTourActive(true);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Acme Dashboard</h1>
      </div>
      <Dashboard tourActive={tourActive} setTourActive={setTourActive} featureId={featureId} pageId={pageId} />
      <ChatBot startTour={startTour} setFeatureId={setFeatureId} setPageId={setPageId} />
    </div>
  );
}

export default App;