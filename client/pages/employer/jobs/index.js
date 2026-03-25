import Layout from "../../../components/layout/Layout";
import MyJobs from "../../../components/job/MyJobs";
import axios from "axios";

import IsAuthenticatedUser from "../../../utils/IsAuthenticated";
export default function NewJobPage({ jobs, access_token }) {
  return (
    <Layout title="Post new job">
      <MyJobs jobs={jobs} access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
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

  const res = await axios.get(`${process.env.API_URL}/jobs/user/created/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const jobs = res.data;

  return {
    props: {
      access_token,
      jobs,
    },
  };
}
