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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notesData, setNotesData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setNotesData({
        description: note.description,
        title: note.title,
      });
    }
  }, [note]);

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Description cannot be empty!");
      return;
    }
    updateNote(note.id, title, content);
    toast.success("Note updated!");

    navigate("/"); // redirect back to Home
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    setNotesData({
      title: "",
      description: "",
    });
  };

  function handleChange(name, value) {
    setNotesData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  console.log("State", notesData);
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
                value={notesData.description}
                name="description"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 justify-end">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={handleClear} required>
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditNote;
  