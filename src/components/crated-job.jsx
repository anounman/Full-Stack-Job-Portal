import { getMyJob } from "@/api/jobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const {
    loading: loadingMyJobs,
    data: myJobs,
    fn: fnMyJobs,
  } = useFetch(getMyJob, {
    recruiter_id: user.id,
  });
  const handleJobAction = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  useEffect(() => {
    fnMyJobs();
  }, [isLoaded, refreshTrigger]);

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
                  onJobAction={handleJobAction}
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
