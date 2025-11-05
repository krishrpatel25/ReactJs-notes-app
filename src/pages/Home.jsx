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

const colors = [
  "bg-yellow-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-pink-100",
  "bg-purple-100",
];

const Home = () => {
  const { notes, deleteNote } = useNotes();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteNote(id);
    toast.success("Note deleted!");
  };

  const handleView = (note) => {
    navigate(`/view/${note.id}`, {
      state: { title: note.title, content: note.content },
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {notes.length === 0 && (
        <p className="text-center text-gray-400 col-span-full text-lg">
          No notes yet. Click 'Add Note' to create one!
        </p>
      )}

      {notes.map((note, index) => (
        <Card
          key={note.id}
          className={`${
            colors[index % colors.length]
          } border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:rotate-1 relative flex flex-col justify-between`}
        >
          {/* Pin Emoji */}
          <div className="absolute top-2 right-2 text-2xl select-none">📌</div>

          <CardContent className="overflow-hidden px-6 py-4">
            <CardTitle className="text-gray-800 text-2xl font-semibold truncate">
              {note.title}
            </CardTitle>
            <p className="mt-2 text-gray-700 whitespace-pre-wrap break-words">
              {note.content}
            </p>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-3 justify-end px-6 py-4">
            <Button
              onClick={() => navigate(`/edit/${note.id}`)}
              className="bg-white text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  Delete
                </Button>
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

            <Button
              onClick={() => handleView(note)}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Home;
