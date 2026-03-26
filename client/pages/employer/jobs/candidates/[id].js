import Layout from "../../../../components/layout/Layout";
import axios from "axios";
// import CandidatesApplied from "../../../../components/job/CandidatesApplied";
import NotFound from "../../../../components/layout/NotFound";
import IsAuthenticatedUser from "../../../../utils/IsAuthenticated";
import { redirect } from "next/dist/server/api-utils";

export default function JobDetailsPage({ candidates_applied, error }) {
  if (error && error.includes("Not found")) return <NotFound />;

  if (!job) return <NotFound />;
  return (
    <Layout title="Job Candidates">
      <CandidatesApplied candidates_applied={candidates_applied} />
    </Layout>
  );
}
export async function getServerSideProps({ req, params }) {
  const access_token = req.cookies.access;

  const user = await IsAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try {
    const res = await axios.get(
      `${process.env.API_URL}/jobs/${params.id}/candidates/`,
    );

    const candidates_applied = res.data;
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
