import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import axios from "axios";

export default function Index({ data }) {
  console.log(data);
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const params = {};
    if (query.key_word) params.key_word = query.key_word;
    if (query.location) params.location = query.location;

    const res = await axios.get(`${process.env.API_URL}/jobs/`, {params});
    const data = res.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(
      "Error fetching jobs:",
      error.response?.data || error.message
    );
    return {
      props: {
        data: null,
      },
    };
  }
}
