import { getCompanies } from "@/api/companies";
import { getJobs } from "@/api/jobs";
import JobCard from "@/components/job-card";
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
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { SelectLabel } from "@radix-ui/react-select";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function JobListing() {
  const { user, isLoaded } = useUser();
  const [location, setLocaion] = useState();
  const [company_id, setCompany_id] = useState();
  const [searchQuery, setSearchQuery] = useState();

  const {
    fn: findJob,
    data: jobs,
    loading,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    console.log(`Search Query :${searchQuery}`);

    if (isLoaded) findJob();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  function handleSearch(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  }

  function clearFilter() {
    setCompany_id("");
    setSearchQuery("");
    setLocaion("");
    const input = document.querySelector('input[name="search-query"]');
    if (input) {
      input.value = "";
    }
  }

  return (
    <div>
      <h1 className="gradient text-transparent bg-clip-text text-center font-extrabold pd-8 text-6xl sm:text-7xl ">
        Latest Jobs
      </h1>
      {/* filters */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3 mt-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 ">
        <Select value={location} onValueChange={(value) => setLocaion(value)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Locations</SelectLabel>
              {State.getStatesOfCountry("DE").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="destructive"
          className="sm:w-1/2"
          onClick={clearFilter}
        >
          Clear Filter
        </Button>
      </div>

      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
      {loading === false && (
        <div className="grid mt-8 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!jobs?.length ? (
            <div>No Jobs Found</div>
          ) : (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  saveInit={job.saved.length > 0}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;
