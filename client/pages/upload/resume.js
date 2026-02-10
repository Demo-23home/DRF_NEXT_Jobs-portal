import Layout from "../../components/layout/Layout";
import UploadResume from "../../components/user/UploadResume";
import IsAuthenticated from "../../utils/IsAuthenticated";

export default function UploadResumePage({access_token}) {
  return (
    <Layout title="Upload Your Resume">
      <UploadResume access_token={access_token} />
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
