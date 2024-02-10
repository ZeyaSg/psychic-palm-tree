import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import { useEffect } from "react";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "./views/main-view";
import ErrorPage from "./views/error-page";
import EventView from "./views/event-view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "events/:eventId",
    element: <EventView />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
