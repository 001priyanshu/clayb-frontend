import React from "react";


const HelpCard = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">For prospecting</h3>
        <p className="text-xs text-gray-600 mb-3">
          You need to create a campaign and enter your customer criteria
        </p>
        <div className="flex gap-2 mb-3">
          <button className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Explore Campaign creation</button>
          <button className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Snooze</button>
        </div>
        <div className="bg-gray-200 p-2 rounded mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1">Cool stuff! There are 4 steps for prospecting:</p>
          <ol className="text-xs text-gray-600 pl-5 list-decimal">
            <li className="mb-1">Create a campaign: Click the create button to start</li>
            <li className="mb-1">Name your campaign: Give it a clear, descriptive name</li>
            <li className="mb-1">Select Criteria: Define your target audience</li>
            <li>Launch: Review and activate your campaign</li>
          </ol>
        </div>
        <button className="w-full bg-indigo-600 text-white text-xs px-2 py-1 rounded">Follow Guide</button>
      </div>
    )
}

export default HelpCard;