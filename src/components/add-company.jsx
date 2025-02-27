import { addNewCompany } from "@/api/companies";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const scheme = z.object({
  name: z.string().min(1, { message: "Please add a valid name" }),
  logo: z.any().refine(
    (file) => {
      if (!file || !file[0]) return false;
      return ["image/png", "image/jpeg", "image/jpg"].includes(file[0].type);
    },
    { message: "Only PNG, JPEG or JPG images are allowed" }
  ),
});

const AddCompany = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(scheme),
  });

  const {
    loading: loadingAddNewCompany,
    data: dataAddNewCompany,
    error: errorAddNewCompany,
    fn: fnAddNewCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    fnAddNewCompany({
      name: data.name,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddNewCompany?.length > 0) {
      fetchCompanies();
      reset();
    }
  }, [loadingAddNewCompany]);

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Button variant="secondary" type="button" size="sm">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a new Company</DrawerTitle>
          </DrawerHeader>

          <form
            className="flex gap-2 p-4 pb-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input placeholder="Company name" {...register("name")} />

            <Input
              type="file"
              accept="image/*"
              className="file:text-gray-500"
              {...register("logo")}
            />

            <Button type="submit" className="w-40" variant="destructive">
              Add
            </Button>
          </form>

          <DrawerFooter>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {errors.logo && (
              <p className="text-red-500">{errors.logo.message}</p>
            )}
            {errorAddNewCompany?.message && (
              <p className="text-red-500">{errorAddNewCompany?.message}</p>
            )}
            {loadingAddNewCompany && (
              <BarLoader width={"100%"} color="#36d7b7" />
            )}
            <DrawerClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCompany;
