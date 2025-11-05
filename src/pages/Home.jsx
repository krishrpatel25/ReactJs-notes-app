import React from "react";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNotes } from "../contexts/NotesContext";
import { Button } from "@/components/ui/button";
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
    <div className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length === 0 && (
        <p className="text-center text-gray-500 col-span-full">
          No notes yet. Click 'Add Note' to create one!
        </p>
      )}

      {notes.map((note) => (
        <Card
          key={note.id}
          className="w-full flex flex-col justify-between bg-liner-to-r from-[#141E30] to-[#243B55] border border-gray-700 shadow-lg wrap-break-words"
        >
          <CardContent className="overflow-hidden">
            <CardTitle className="text-white text-2xl font-semibold">
              {note.title}
            </CardTitle>
            <p className="mt-2 text-white/90">{note.content}</p>
          </CardContent>

          <CardFooter className="flex gap-4 justify-end flex-wrap">
            <Button
              onClick={() => navigate(`/edit/${note.id}`)}
              variant="outline"
            >
              Edit
            </Button>

            {/* AlertDialog for Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
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
