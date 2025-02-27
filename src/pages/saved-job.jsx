import { getSaveJob } from "@/api/jobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function SavedJob() {
  const { user, isLoaded } = useUser();
  const {
    loading: loadingSavedJob,
    data: dataSavedJob,
    fn: fnSavedJob,
  } = useFetch(getSaveJob);

  useEffect(() => {
    if (isLoaded) fnSavedJob();
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient text-transparent bg-clip-text text-center font-extrabold pd-8 text-6xl sm:text-7xl">
        Saved Job
      </h1>
      {loadingSavedJob === false && (
        <div className="">
          {!dataSavedJob?.length ? (
            <div className="flex justify-center mt-8 items-center ">
              No Saved Jobs Found🥲
            </div>
          ) : (
            dataSavedJob.map((saved) => {
              return (
                <div className="grid mt-8 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <JobCard
                    key={saved.id}
                    job={saved.job}
                    saveInit={true}
                    onJobSaved={fnSavedJob}
                  />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default SavedJob;
