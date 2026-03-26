import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import JobCandidates from "../../../../components/job/JobCandidates";
import NotFound from "../../../../components/layout/NotFound";
import IsAuthenticatedUser from "../../../../utils/IsAuthenticated";

export default function JobCandidatesPage({ candidates_applied, error }) {
  if (error) return <NotFound />;

  return (
    <Layout title="Job Candidates">
      <JobCandidates candidates_applied={candidates_applied} />
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
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return {
      props: {
        candidates_applied: res.data,
      },
    };
  } catch (error) {
    return {
      props: {
        // error.response?.data?.detail may be undefined, always fall back to null
        error: error.response?.data?.detail || error.message || null,
      },
    };
  }
}