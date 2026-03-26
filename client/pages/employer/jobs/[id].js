import Layout from "../../../components/layout/Layout";
import axios from "axios";
import UpdateJob from "../../../components/job/UpdateJob";
import NotFound from "../../../components/layout/NotFound";
import IsAuthenticatedUser from "../../../utils/IsAuthenticated";

export default function UpdateJobsPage({ error, access_token, job }) {
  if (error) return <NotFound />;

  return (
    <Layout title="Update job">
      <UpdateJob job={job} access_token={access_token} />
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
    const res = await axios.get(`${process.env.API_URL}/jobs/${params.id}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const job = res.data.job;

    return {
      props: {
        job,
        access_token,
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
