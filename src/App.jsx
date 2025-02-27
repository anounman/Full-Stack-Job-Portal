// filepath: /d:/Code/Web Devlopent/job_portal/src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"; // Ensure Tailwind CSS is imported
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";
import AppLayout from "./layout/app-layout";
import Job from "./pages/job";
import JobListing from "./pages/job-listing";
import LandingPage from "./pages/landing";
import MyJob from "./pages/my-job";
import Onbording from "./pages/onbording";
import PostJob from "./pages/post-job";
import SavedJob from "./pages/saved-job";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onbording />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-job",
        element: (
          <ProtectedRoute>
            <MyJob />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
