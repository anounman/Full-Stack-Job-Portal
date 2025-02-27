import { getSingleJob, updateHiringStatus } from "@/api/jobs";
import ApplicationCard from "@/components/application-card";
import ApplyJobDrawer from "@/components/apply-job";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Briefcase,
  DoorClosedIcon,
  DoorOpenIcon,
  MapPinIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Job() {
  const { id } = useParams();

  const { isLoaded, user } = useUser();
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });
  const { loading: loadingHiringStatus, fn: fnUpdateHiringJobStatus } =
    useFetch(updateHiringStatus, {
      job_id: id,
    });

  const handelHiringStatus = async () => {
    const newStatus = !job?.is_open;

    await fnUpdateHiringJobStatus(newStatus).then(async () => await fnJob());
  };

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5 mb-10">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
        <h1 className="gradient text-transparent bg-clip-text pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt="" srcSet="" />
      </div>
      {job?.recruiter_id === user?.id && (
        <div>
          <Button
            variant={`${job?.is_open ? "blue" : "destructive"}`}
            onClick={handelHiringStatus}
            id="status"
          >
            {job?.is_open ? "Status(Open)" : "Status(Closed)"}
          </Button>
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
          <div className="flex gap-2">
            <Briefcase />
            {job?.applications?.length}
          </div>
        </div>
        {job?.is_open ? (
          <div className="flex gap-2">
            <DoorOpenIcon />
            Open
          </div>
        ) : (
          <div className="flex gap-2">
            <DoorClosedIcon />
            Closed
          </div>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold ">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />
      {/* render applications */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications.find(
            (application) => application.candidate_id === user.id
          )}
        />
      )}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="grid gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold ">Applications</h2>
          {job?.applications.map((application) => (
            <ApplicationCard application={application} key={application.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Job;
