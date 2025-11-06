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

      {notes.map((note, index) => {
        return (
          <Card
            key={note.id}
            className={`bg-[#CBB3FF] border-2 border-black rounded-3xl  
              transition-all transform 
              relative flex flex-col justify-between p-6`}
          >
            {/* Pin Emoji */}

            {/* Note Content */}
            <CardContent className="overflow-hidden p-0">
              <CardTitle className="text-xl font-bold truncate mb-2">
                {note.title}
              </CardTitle>
              <p className="text-sm opacity-90 whitespace-pre-wrap break-words leading-relaxed">
                {note.content}
              </p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex justify-between items-center mt-6 p-0">
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/edit/${note.id}`)}
                  size="sm"
                  className="bg-black border-2 border-black text-white hover:bg-gray-800 rounded-full px-3 py-1"
                >
                  Edit
                </Button>

                <AlertDialog className="bg-[#CBB3FF] border-2 border-black">
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 border-2 border-black text-white rounded-full px-3 py-1"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this note.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-black text-white border-2 border-black rounded-l-full">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-[#CBB3FF] border-2 border-black text-black rounded-r-full hover:bg-[#d5c5f8] "
                        onClick={() => handleDelete(note.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  onClick={() => handleView(note)}
                  size="sm"
                  className="bg-white border-2 border-black text-black hover:bg-gray-200 rounded-full px-3 py-1"
                >
                  View
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
