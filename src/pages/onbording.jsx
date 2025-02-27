import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Onbording() {
  const { user, isLoaded } = useUser();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      if (user.unsafeMetadata.role) {
        const role = user.unsafeMetadata.role;
        navigateTo(role === "recruiter" ? "/post-job" : "/jobs");
      }
    }
  }, [isLoaded, user, navigateTo]);

  const handelRoleSelection = async (role) => {
    console.log("Role selecting...");
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigateTo(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((e) => console.log(e));
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <h2 className="gradient text-transparent bg-clip-text font-extrabold text-7xl sm:text-8xl">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 w-full gap-4 md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handelRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handelRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}

export default Onbording;
