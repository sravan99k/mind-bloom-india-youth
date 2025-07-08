
import React from "react";
import Footer from "@/components/Footer";
import BuddySafeAwareness from "@/components/BuddySafeAwareness";

const BuddySafe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="py-12">
        <BuddySafeAwareness />
      </div>
      <Footer />
    </div>
  );
};

export default BuddySafe;
