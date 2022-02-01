import axios from "axios";

export const getMonsters = async ({ input, CR, type, page }) => {
  try {
    if (type === "any") {
      type = "";
    }
    const res = await axios.get(
      `/api/monsters/?search=${input}&cr=${CR}&types=${type}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
