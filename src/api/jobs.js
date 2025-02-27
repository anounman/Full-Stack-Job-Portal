import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("jobs").select("* ,saved: saved_jobs(id) ,  company:companies(name, logo_url)");
    if (location) {
        query = query.eq("location", location);
    }
    if (company_id) {
        query = query.eq("company_id", company_id);
    }
    if (searchQuery) {

        query = query.like("title", `%${searchQuery}%`);
    }
    const { data, error } = await query;


    if (error) {
        console.log(`Erro on fetching jobs ${error}`);
        return null;
    }

    return data;
}
export async function saveJob(token, { alredaySaved }, savedJob) {
    const supabase = await supabaseClient(token);

    if (alredaySaved) {
        const { error } = await supabase.from("saved_jobs").delete().eq("job_id", savedJob.job_id);
        if (error) {
            console.log(`Error on deleting saved job ${error}`);
            return null;
        }
        return data;
    } else {
        const { data, error } = await supabase.from("saved_jobs").insert([savedJob]).select();
        if (error) {
            console.log(`Error on saving job ${error}`);
            return null;
        }
        return data;
    }

}
export async function getSingleJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
    let query = supabase
        .from("jobs")
        .select(
            "*, company: companies(name,logo_url), applications: applications(*)"
        )
        .eq("id", job_id)
        .single();

    const { data, error } = await query;


    if (error) {
        console.error("Error fetching Job:", error);
        return null;
    }

    return data;
}
export async function updateHiringStatus(token, { job_id }, newStatus) {
    console.log(`updating status to: ${newStatus} for job id: ${job_id}`);

    const supabase = await supabaseClient(token);
    try {
        const { data, error } = await supabase
            .from("jobs")
            .update({ is_open: newStatus })
            .eq("id", job_id)
            .select();

    } catch (error) {
        console.log(`Error on updating job ${error.message}`);
        return null;

    }
    return data;
}
export async function postJob(token, _, jobData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
        .from("jobs")
        .insert([jobData])
        .select();
    ;
    if (error) {
        console.log(`Error on Creating Job: ${error.message}`);
        return null;
    }
    return data;
}