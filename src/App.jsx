import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import View from "./pages/View";
import { NoteProvider } from "./contexts/NotesContext";
import { Toaster } from "sonner";
import EditNote from "./pages/EditNote";
import RhfForm from "./pages/rhf/RhfForm";
import Products from "./pages/product/Products";
import ViewProduct from "./pages/product/ViewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "form", element: <Form /> },
      { path: "edit/:id", element: <EditNote /> },
      { path: "view", element: <View /> },
      { path: "view/:id", element: <View /> },
      { path: "rhf", element: <RhfForm /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ViewProduct /> },
    ],
  },
]);

function App() {
  return (
    <NoteProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-right" />
    </NoteProvider>
  );
}

export default App;
