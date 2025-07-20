import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="h-96 w-20 animate-spin" />
    </div>
  );
};

export default Loading;