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
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    const regex = /^[a-zA-Z0-9 ]*$/;

    if (!regex.test(value)) {
      setTitleError("Title cannot contain special characters.");
    } else if (value.length < 5 || value.length > 20) {
      setTitleError("Title must be between 5 and 20 characters.");
    } else {
      setTitleError("");
    }
  };
  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    if (value.length < 10) {
      setContentError("discription must be greater than 10 characters");
    } else if (value.length > 100) {
      setContentError("discription must be less than 100 characters");
    } else {
      setContentError("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Description cannot be empty!");
      return;
    }
    // if (titleError || contentError) {
    //   return;
    // } else {
    //   addNote(title, content);
    //   toast.success("Note added!");
    //   navigate("/"); // Go to Home page
    // }

    addNote(title, content);
    toast.success("Note added!");
    navigate("/"); // Go to Home page
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    toast("Form cleared!");
  };

  return (
    <div className="flex justify-center items-start pt-16 px-4 ">
      <Card className="w-full max-w-2xl bg-[#cbb3ff] border-2 border-black">
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <CardTitle>Title</CardTitle>
              <Input
                className="bg-white border-2 border-black"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={handleTitleChange}
                required
              />
              {titleError && (
                <p className="text-red-600 text-sm">{titleError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <CardTitle>Description</CardTitle>
              <Textarea
                className="bg-white border-2 border-black"
                placeholder="Type your note here"
                value={content}
                onChange={handleContentChange}
                required
              />
              {contentError && (
                <p className="text-red-600 text-sm">{contentError}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2  justify-end ">
          <Button
            className="rounded-l-full border-2 border-black"
            onClick={handleSubmit}
            disabled={!!titleError || !!contentError || !title || !content}
          >
            Submit
          </Button>
          <Button
            className="rounded-r-full border-2 border-black"
            variant="outline"
            onClick={handleClear}
          >
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Form;
