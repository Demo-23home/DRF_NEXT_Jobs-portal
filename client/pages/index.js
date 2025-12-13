import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import axios from "axios";

export default function Index({ data }) {
  console.log("data", data);
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.API_URL}/jobs/`);
    const data = res.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error.response?.data || error.message);
    return {
      props: {
        data: null,
      },
    };
  }
}