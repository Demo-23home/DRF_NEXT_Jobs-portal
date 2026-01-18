import { redirect } from "next/dist/server/api-utils";
import Layout from "../../components/layout/Layout";
import UpdateProfile from "../../components/user/UpdateProfile";
import IsAuthenticated from "../../utils/IsAuthenticated";

export default function UpdateProfilePage({access_token}) {
  return (
    <Layout title="UpdateProfile">
      <UpdateProfile access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access;

  const validUser = await IsAuthenticated(access_token);

  if (!validUser) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      access_token,
    },
  };
}
