
import React from "react";
import Footer from "@/components/Footer";
import BuddySafeReport from "@/components/BuddySafeReport";

const BuddySafe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
            <div className="py-12">
        <BuddySafeReport />
      </div>
      <Footer />
    </div>
  );
};

export default BuddySafe;
