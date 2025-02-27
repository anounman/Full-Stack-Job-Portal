import { applyJob } from "@/api/application";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

const scheme = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, {
    message: "Skills are requied",
  }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is requied",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      {
        message: "Only PDF or Word documents are allowed",
      }
    ),
});

function ApplyJobDrawer({ user, job, applied = false, fetchJob }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(scheme),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <div>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild className="w-full">
          <Button
            size="lg"
            variant={job?.is_open && !applied ? "blue" : "destructive"}
            disabled={!job?.is_open || applied}
          >
            {job?.is_open ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Apply for {job?.title} at {job?.company?.name}{" "}
            </DrawerTitle>
            <DrawerDescription>Please Fill the form below</DrawerDescription>
          </DrawerHeader>
          <form
            className="flex flex-col gap-4 p-4 pb-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="number"
              placeholder="Years of Experience"
              className="flex-1"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />
            {errors.experience && (
              <p className="text-red-500">{errors.experience.message}</p>
            )}
            <Input
              type="text"
              placeholder="Skills (eg: Java , Python...)"
              className="flex-1"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-500">{errors.skills.message}</p>
            )}
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} {...field}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="graduate">Graduate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <Label htmlFor="post-graduate">Post Graduate</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-red-500">{errors.education.message}</p>
            )}
            <Input
              type="file"
              accept=".pdf ,  .doc , .docx"
              className="flex-1 file:text-gray-500"
              {...register("resume")}
            />
            {errors.resume && (
              <p className="text-red-500">{errors.resume.message}</p>
            )}
            {errorApply?.message && (
              <p className="text-red-500">{errorApply?.message}</p>
            )}
            {loadingApply && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit" variant="blue" size="lg">
              Apply
            </Button>
          </form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ApplyJobDrawer;
