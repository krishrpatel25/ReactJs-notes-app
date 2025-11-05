import React, { useState } from "react";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useNotes } from "../contexts/NotesContext";

const Form = () => {
  const navigate = useNavigate();
  const { addNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Description cannot be empty!");
      return;
    }
    addNote(title, content);
    toast.success("Note added!");
    navigate("/"); // Go to Home page
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    toast("Form cleared!");
  };

  const handleView = (id) => {
    navigate(`/view/${id}`, { state: { title, content } });
  };

  return (
    <div className="flex justify-center items-start pt-16 px-4">
      <Card className="w-full max-w-2xl">
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <CardTitle>Title</CardTitle>
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <CardTitle>Description</CardTitle>
              <Textarea
                placeholder="Type your note here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outline" onClick={() => handleView("new")}>
            View
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Form;
