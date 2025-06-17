import { logoutUser } from "@/store/auth-slice";
import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("userProfile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  function handleLogout() {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "userProfile":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">User Profile</h2>
            <p className="mb-4 font-semibold">
              Manage your account details and change your plan
            </p>
            <div className="flex flex-col items-start gap-5 py-6">
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold">Username:</span>
                <span className="text-lg">{user?.userName || "N/A"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold">Email:</span>
                <span className="text-lg">{user?.email || "N/A"}</span>
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p className="font-semibold">Manage your security settings here.</p>
          </div>
        );
      case "billingDetails":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Billing Details</h2>
            <p className="font-semibold">
              View and manage your billing information here.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto px-4 border-t border-gray-200">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-4 flex flex-col items-start h-96 border-r border-gray-200">
        <div className="text-lg font-semibold mb-6">Account Information</div>
        <button
          onClick={() => setActiveTab("userProfile")}
          className={`block w-full text-left px-2 font-semibold py-2 rounded mb-2 ${
            activeTab === "userProfile" ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
          }`}
        >
          User Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`block w-full text-left px-2 font-semibold py-2 rounded mb-2 ${
            activeTab === "security" ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("billingDetails")}
          className={`block w-full text-left px-2 font-semibold py-2 rounded ${
            activeTab === "billingDetails" ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
          }`}
        >
          Billing Details
        </button>
        <button
          className="mt-28 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut />
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </div>
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default Profile;