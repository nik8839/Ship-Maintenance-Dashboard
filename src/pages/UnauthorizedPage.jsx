import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Link to="/" className="text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
