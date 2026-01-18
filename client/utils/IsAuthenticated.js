import axios from "axios";

const IsAuthenticatedUser = async (access_token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/accounts/verify/`,
      { token: access_token },
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default IsAuthenticatedUser; 