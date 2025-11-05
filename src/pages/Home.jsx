import React from "react";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNotes } from "../contexts/NotesContext";
const Home = () => {
  const { notes } = useNotes();

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 flex flex-col gap-6">
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
        </Card>
      ))}
    </div>
  );
};

export default Home;
