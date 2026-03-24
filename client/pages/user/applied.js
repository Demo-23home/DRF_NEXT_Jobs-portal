import { redirect } from "next/dist/server/api-utils";
import Layout from "../../components/layout/Layout";
import axios from "axios";

import IsAuthenticatedUser from "../../utils/IsAuthenticated";
export default function UserAppliedJobsPage({ jobs }) {
    console.log(jobs)
  return (
    <Layout title="Jobs Applied">
      <h1>Jobs Applied</h1>
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

  const res = await axios.get(
    `${process.env.API_URL}/jobs/list/applications/`,
    {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    },
  );
  const jobs = res.data
  return {
    props: {
      jobs,
    },
  };
}
