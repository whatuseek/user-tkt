import "./App.css";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function TicketForm() {
  // State variables to store form input values
  const [userId, setUserId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [issueType, setIssueType] = useState("");
  const [comment, setComment] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to reset form fields
  const handleReset = () => {
    setUserId("");
    setMobileNumber("");
    setLocation("");
    setIssueType("");
    setComment("");
    // Reset the mobile number warning if visible
    const warningElement = document.getElementById("mobile-number-warning");
    if (warningElement) {
      warningElement.style.display = "none";
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      timestamp: currentTime, // Include the timestamp
      userId,
      mobileNumber,
      location,
      issueType,
      comment,
    };

    console.log("Ticket submitted:", submissionData);

    // Send submissionData to the backend
    const response = await fetch('http://localhost:3000/api/tickets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionData)
    });

    const data = await response.json();
    console.log(data);
  };

  // Function to get the current timestamp
  const getCurrentTimestamp = () => {
    return new Date().toLocaleString();
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-12">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-12 xl:p-12">
        <h2 className="text-lg text-black font-bold mb-4">Report an Issue</h2>

        {/* Display current timestamp */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Ticket Time: {getCurrentTimestamp()}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* User ID */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userId"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              placeholder="Enter your User ID"
              onChange={(e) => setUserId(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="mobile-number"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                    "Enter",
                    "Tab",
                    "Delete",
                  ];
                  if (!allowedKeys.includes(e.key) && !e.key.match(/[0-9]/)) {
                    document.getElementById(
                      "mobile-number-warning"
                    ).style.display = "block";
                    e.preventDefault();
                  } else {
                    document.getElementById(
                      "mobile-number-warning"
                    ).style.display = "none";
                  }
                }}
                placeholder="Mobile Number"
              />
              <div
                id="mobile-number-warning"
                style={{ display: "none", color: "red", fontSize: "12px" }}
              >
                Required field warning: Please enter only numbers
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              placeholder="Enter Location"
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          {/* Issue Type */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="issueType"
            >
              Issue Type
            </label>
            <div className="relative">
              <select
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="issue-type"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                <option
                  className="bg-gray-200 text-gray-700"
                  value=""
                  disabled
                  hidden
                  selected
                >
                  Select your issue type
                </option>
                <option value="connection">Connection Problems</option>
                <option value="speed">Slow Internet Speed</option>
                <option value="intermittent">Intermittent Service</option>
                <option value="router">Router/Modem Issues</option>
                <option value="billing">Billing Queries</option>
                <option value="installation">Installation/Setup Issues</option>
                <option value="wifi">WiFi Connectivity</option>
                <option value="service_outage">Service Outage</option>
                <option value="package">Package/Plan Changes</option>
                <option value="technical">Technical Support</option>
                <option value="device">Device Configuration</option>
                <option value="other">Other Issues</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              placeholder="Enter your comments"
              onChange={(e) => setComment(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Submit & Reset Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketForm;