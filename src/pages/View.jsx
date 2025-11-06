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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Card className="w-full flex flex-col justify-between bg-gradient-to-r bg-[#CBB3FF] border-2 border-black ">
        <CardContent>
          <CardTitle className=" text-black text-2xl font-semibold">
            {title}
          </CardTitle>
          <p className="mt-2  text-black">{content}</p>
        </CardContent>
        <div className="flex justify-end px-6">
          <Button
            className=" bg-white rounded-full border-2 border-black text-black hover:bg-white/90"
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
