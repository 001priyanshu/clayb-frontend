import React from "react";

const CampaignCard = () => {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Search for campaign</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search..."
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <div className="relative">
                <select className="appearance-none w-44 border border-gray-200 rounded-md pl-3 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
                <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <div className="relative">
                <select className="appearance-none w-44 border border-gray-200 rounded-md pl-3 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Sale</option>
                  <option>Promotion</option>
                  <option>Event</option>
                </select>
                <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
    )
}

export default CampaignCard;