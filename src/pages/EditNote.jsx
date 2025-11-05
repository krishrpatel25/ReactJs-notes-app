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

  useEffect(() => {
    if (note) {
      setNotesData({
        title: note.title,
        content: note.content,
      });
    }
  }, [note]);

  const handleUpdate = () => {
    if (!notesData.title.trim() || !notesData.content.trim()) {
      toast.error("Title and Description cannot be empty!");
      return;
    }
    updateNote(note.id, notesData.title, notesData.content);
    toast.success("Note updated!");
    navigate("/"); // back to Home
  };

  const handleClear = () => {
    setNotesData({ title: "", content: "" });
  };

  function handleChange(name, value) {
    setNotesData((prev) => ({ ...prev, [name]: value }));
  }

  if (!note)
    return <p className="text-center mt-10 text-gray-500">Note not found!</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card className="w-full max-w-2xl">
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <CardTitle>Title</CardTitle>
              <Input
                type="text"
                placeholder="Enter title"
                value={notesData.title}
                name="title"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle>Description</CardTitle>
              <Textarea
                placeholder="Type your note here"
                value={notesData.content}
                name="content"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 justify-end">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditNote;
