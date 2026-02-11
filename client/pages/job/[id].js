import Layout from "../../components/layout/Layout";
import axios from "axios";
import JobDetails from "../../components/job/JobDetails";
import NotFound from "../../components/layout/NotFound";

export default function JobDetailsPage({ job, candidates, access_token, error }) {
  if (error && error.includes("Not found")) return <NotFound />;

  if (!job) return <NotFound />; // fallback if job is undefined
  return (
    <Layout title={job.title}>
      <JobDetails job={job} candidates={candidates} access_token={access_token}/>
    </Layout>
  );
}
export async function getServerSideProps({ req, params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);
    const job = res.data.job;
    const candidates = res.data.candidates;

    const access_token = req.cookies.access || ""


    return {
      props: {
        job,
        candidates,
        access_token, 
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}
