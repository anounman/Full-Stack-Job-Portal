import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyJob(token, _, jobData) {

    const supabase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${jobData.candidate_id}.pdf`;
    const { error: uploadingError } = await supabase.storage
        .from("resumes")
        .upload(fileName, jobData.resume);
    if (uploadingError) {
        console.log(`Error on uploading resume ${uploadingError.message}`);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;
    const { data, error } = await supabase
        .from("applications").insert([
            {
                ...jobData,
                resume,
            }
        ]);
    if (error) {
        console.log(`Error on applying job ${error.message}`);
        return null;
    }

    return data;
}


export async function updateApplicationStatus(token, { job_id }, status) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
        .from("applications")
        .update({ status })
        .eq("job_id", job_id)
        .select();
    ;
    if (error || data.length === 0) {
        console.log(`Error on updating application ${error.message}`);
        return null;
    }
    return data;
}
