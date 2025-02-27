import { title } from "@uiw/react-md-editor";
import { z } from "zod";



const scheme  = z.object({
  title: z.string().min(1 , {message : "Please add a valid title"}),
  description: z.string().min(1 , {message : "Please add a valid description"}),
  location: z.string().min(1 , {message : "Please add a valid location"}),
  company_id : z.string().min(1 , {messsage : "Please select or add a company"}),
  requirements : z.string().min(1 , {message : "Please add the requirements"}),
})

function PostJob() {



  return <div>PostJob</div>;
}

export default PostJob;
