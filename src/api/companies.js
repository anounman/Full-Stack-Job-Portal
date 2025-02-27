import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase.from("companies").select("*");

    if (error) {
        console.error("Error fetching Companies:", error);
        return null;
    }

    return data;
}

export async function addNewCompany(token, _, companyData) {
    const supabase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;
    const { error: uploadingError } = await supabase.storage
        .from("company-logo")
        .upload(fileName, companyData.logo);
    if (uploadingError) {
        console.log(`Error on uploading company logo ${uploadingError.message}`);
        return null;
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;
    const { data, error } = await supabase
        .from("companies").insert([
            {
                name: companyData.name,
                logo_url
            }
        ])
        .select();

    if (error) {
        console.error("Error creating company:", error?.message);
        return null;
    }

    return data;
}