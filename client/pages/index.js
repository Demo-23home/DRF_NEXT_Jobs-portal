import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import axios from "axios";

export default function Index({ data }) {
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
    if (query.page) params.page = query.page;

    let min_salary = "";
    let max_salary = "";

    if (query.salary) {
      const [min, max] = query.salary.split("-");
      if (min && max) {
        min_salary = min;
        max_salary = max;
        params.min_salary = min_salary;
        params.max_salary = max_salary;
      }
    }
    if (query.education) params.education = query.education;
    if (query.job_type) params.job_type = query.job_type;
    if (query.experience) params.experience = query.experience;

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/`, { params });
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
