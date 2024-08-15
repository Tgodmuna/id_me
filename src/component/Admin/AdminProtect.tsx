import React, { useState, useEffect } from "react";

const withAdminProtection = (
  WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>
) => {
  return function AdminProtectedComponent(props: JSX.IntrinsicAttributes) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Prompt the user for admin credentials
      const username = window.prompt("Enter admin username:");
      const password = window.prompt("Enter admin password:");

      // Validate credentials
      if (username === "Admin" && password === "**_admin00#") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);

    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <div className="warning-container">
        <div className="warning-content">
          <h1>🚫 Access Denied</h1>
          <p>You do not have permission to view this page.</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  };
};

export default withAdminProtection;
