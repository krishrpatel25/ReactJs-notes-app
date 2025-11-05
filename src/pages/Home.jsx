import React from "react";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNotes } from "../contexts/NotesContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Home = () => {
  const { notes, deleteNote } = useNotes();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteNote(id);
    toast.success("Note deleted!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 flex flex-col gap-6">
      {notes.length === 0 && (
        <p className="text-center text-gray-500">
          No notes yet. Click 'Add Note' to create one!
        </p>
      )}

      {notes.map((note) => (
        <Card
          key={note.id}
          className="w-full flex flex-col justify-between bg-gradient-to-r from-[#141E30] to-[#243B55] border border-gray-700 shadow-lg"
        >
          <CardContent>
            <CardTitle className="text-white text-2xl font-semibold">
              {note.title}
            </CardTitle>
            <p className="mt-2 text-white/90">{note.content}</p>
          </CardContent>
          <CardFooter className="flex gap-4 justify-end">
            <Button onClick={() => navigate(`/edit/${note.id}`)}>Edit</Button>

            {/* AlertDialog for Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(note.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Home;
