import CreatedJob from "@/components/crated-job";
import CreatedApplication from "@/components/created-applications";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

function MyJob() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      {" "}
      <h1 className="gradient text-transparent bg-clip-text text-center font-extrabold pd-8 text-6xl sm:text-7xl">
        {user?.unsafeMetadata?.role === "recruiter"
          ? "My Jobs"
          : "My Applications"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplication />
      ) : (
        <CreatedJob />
      )}
    </div>
  );
}

export default MyJob;
