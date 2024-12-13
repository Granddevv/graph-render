import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-full w-full">
      <div className="flex-1">
        <Link to="/linear-graph">Linear graph</Link>
      </div>
    </div>
  );
}
