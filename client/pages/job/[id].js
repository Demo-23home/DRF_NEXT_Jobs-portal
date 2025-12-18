import Layout from "../../components/layout/Layout";
import axios from "axios";
import JobDetails from "../../components/job/JobDetails";
export default function JobDetailsPage({ job, candidates }) {
  console.log(job, candidates);
  return (
    <Layout>
      <JobDetails job={job} candidates={candidates} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${process.env.API_URL}/jobs/${params.id}`);
  const job = res.data.job;
  const candidates = res.data.candidates;

  return {
    props: {
      job,
      candidates,
    },
  };
}
