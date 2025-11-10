import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../contexts/NotesContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { toast } from "sonner";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, updateNote } = useNotes();

  const note = notes.find((note) => note.id === parseInt(id));
  const [notesData, setNotesData] = useState({ title: "", content: "" });
  const [error, setError] = useState({ title: "", content: "" });
  const [isDirty, setIsDirty] = useState(false); // ✅ boolean flag

  function resetForm(data) {
    // Some logic run karvu che
    setNotesData({ ...data });
  }

  useEffect(() => {
    // const fetch
    const res = {} // some obj
    if (note) {
      resetForm({
        title: note.title,
        content: note.content,
        ...res,
      });
      // copy and paste all 10 lines here
    }
  }, [note]);

  function handleChange(name, value) {
    setNotesData((prev) => {
      const updated = { ...prev, [name]: value };

      // ✅ Check if user changed anything compared to original note
      if (updated.title !== note.title || updated.content !== note.content) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }

      return updated;
    });

    // Validation
    if (name === "title") {
      const regex = /^[a-zA-Z0-9 ]*$/;

      if (!regex.test(value)) {
        setError((prev) => ({
          ...prev,
          title: "Title cannot contain special characters.",
        }));
      } else if (value.trim().length === 0) {
        setError((prev) => ({
          ...prev,
          title: "Title field is Required",
        }));
      } else if (value.length < 5 || value.length > 20) {
        setError((prev) => ({
          ...prev,
          title: "Title must be between 5 and 20 characters.",
        }));
      } else {
        setError((prev) => ({ ...prev, title: "" }));
      }
    } else if (name === "content") {
      if (value.length < 10) {
        setError((prev) => ({
          ...prev,
          content: "Description must be at least 10 characters.",
        }));
      } else if (value.length > 100) {
        setError((prev) => ({
          ...prev,
          content: "Description must be less than 100 characters.",
        }));
      } else {
        setError((prev) => ({ ...prev, content: "" }));
      }
    }
  }

  const handleUpdate = () => {
    if (error.title || error.content) {
      return;
    }

    updateNote(note.id, notesData.title, notesData.content);
    toast.success("Note updated!");
    setIsDirty(false); // ✅ reset after update
    navigate("/");
  };

  const handleClear = () => {
    resetForm({ title: "", content: "" });
    setIsDirty(true); // clearing is also a change
  };

  if (!note)
    return <p className="text-center mt-10 text-gray-500">Note not found!</p>;

  const isButtonDisabled = !!error.title || !!error.content || !isDirty; // ✅ only enabled when dirty

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card className="w-full max-w-2xl bg-[#cbb3ff] border-2 border-black">
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <CardTitle>Title</CardTitle>
              <Input
                className="bg-white border-2 border-black"
                type="text"
                placeholder="Enter title"
                value={notesData.title}
                name="title"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
              {error.title && (
                <p className="text-red-600 text-sm">{error.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <CardTitle>Description</CardTitle>
              <Textarea
                className="bg-white border-2 border-black"
                placeholder="Type your note here"
                value={notesData.content}
                name="content"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
              {error.content && (
                <p className="text-red-600 text-sm">{error.content}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 justify-end">
          <Button
            className="rounded-l-full border-2 border-black"
            onClick={handleUpdate}
            disabled={isButtonDisabled}
          >
            Update
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

export default EditNote;
