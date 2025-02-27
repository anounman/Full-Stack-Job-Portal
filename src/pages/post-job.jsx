import { getCompanies } from "@/api/companies";
import { postJob } from "@/api/jobs";
import AddCompany from "@/components/add-company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const scheme = z.object({
  title: z.string().min(1, { message: "Please add a valid title" }),
  description: z.string().min(1, { message: "Please add a valid description" }),
  location: z.string().min(1, { message: "Please add a valid location" }),
  company_id: z.string().min(1, { messsage: "Please select or add a company" }),
  requirements: z.string().min(1, { message: "Please add the requirements" }),
});

function PostJob() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const {
    loading: loadingPostJob,
    error: jobPostError,
    fn: fnPostJob,
  } = useFetch(postJob);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(scheme),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
    data: dataPostJob,
  } = useFetch(getCompanies);

  const onSubmit = (data) => {
    fnPostJob({
      ...data,
      recruiter_id: user.id,
      is_open: true,
    });
  };
  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (dataPostJob?.length > 0) navigate("/jobs");
  }, [loadingPostJob]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  console.log(`User role ${user?.unsafeMetadata?.role}`);

  if (user?.unsafeMetadata?.role !== "recruiter") {
    console.log("Not a recruiter");

    return <Navigate to="/jobs" />;
  }

  return (
    <div className="mb-4">
      <h1 className="gradient text-transparent bg-clip-text text-center font-extrabold pd-8 text-6xl sm:text-7xl ">
        Post a Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid pb-0 gap-4 p-4 ">
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500">{errors.title?.message}</p>
        )}
        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description?.message}</p>
        )}
        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("DE").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={name} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Add Company  */}
          <AddCompany fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {loadingPostJob && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PostJob;
