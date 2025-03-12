import React from "react";

const CampaignData =({loading, campaigns}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 min-h-[300px]">
        {loading ? (
          <p className="text-center text-gray-500">Loading campaigns...</p>
        ) : campaigns.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Age Range</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{campaign.name}</td>
                  <td className="border border-gray-300 p-2">{campaign.status}</td>
                  <td className="border border-gray-300 p-2">${campaign.ageRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">No campaign data to display</p>
            <p className="text-gray-400 text-xs">Create your first campaign to get started</p>
          </div>
        )}
      </div>
    )
}

export default CampaignData;