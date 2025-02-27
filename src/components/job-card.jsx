import { saveJob } from "@/api/jobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Heart, MapPin, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function JobCard({
  job,
  isMyJob = false,
  saveInit = false,
  onJobSaved = () => {},
}) {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(saveInit);

  const {
    fn: saveJobFn,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alredaySaved: isSaved,
  });

  const handelSaveJob = async () => {
    await saveJobFn({
      job_id: job.id,
      user_id: user.id,
    }).then(() => setIsSaved(!isSaved));

    onJobSaved();
  };

  return (
    <Card className="grid">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <TrashIcon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <div className="grid gap-2">
          <div className="flex justify-between">
            {job.company && (
              <img src={job.company.logo_url} className="h-6"></img>
            )}
            <div className="flex flex-row gap-2 items-center ">
              <MapPin size={15} className="text-white" />
              {job.location ?? "No location"}
            </div>
          </div>
          <hr />
          {job.description.substring(0, job.description.indexOf("."))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handelSaveJob}
            disabled={loadingSavedJob}
          >
            {isSaved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} stroke="red" fill="transparent" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;
