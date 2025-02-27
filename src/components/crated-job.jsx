import { getMyJob } from "@/api/jobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreatedJobs = () => {
  const { user , isLoaded } = useUser();

  const {
    loading: loadingMyJobs,
    data: myJobs,
    fn: fnMyJobs,
  } = useFetch(getMyJob, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnMyJobs();
  }, [isLoaded]);

  return (
    <div>
      {loadingMyJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myJobs?.length ? (
            myJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobSaved={fnMyJobs}
                  isMyJob
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
