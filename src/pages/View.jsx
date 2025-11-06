import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button";

function View() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get note data from state
  const { title, content } = location.state || {};

  if (!title && !content) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No note selected to view.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 pt-10 px-4">
      <Card className="bg-[#CBB3FF] w-full max-w-4xl shadow-xl rounded-2xl  border-2 border-black">
        <CardContent className="max-h-[500px] overflow-y-auto p-6">
          <CardTitle className="text-black text-3xl font-bold break-words">
            {title}
          </CardTitle>
          <p className="mt-4 text-black  break-words whitespace-pre-wrap">
            {content}
          </p>
        </CardContent>

        <div className="flex justify-end px-6 pb-6">
          <Button
            className="bg-white rounded-full border-2 border-black text-black hover:bg-white/90"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default View;
