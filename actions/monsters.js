import axios from "axios";

export const getMonsters = async (search, CR, type, page) => {
  try {
    const res = await axios.get(
      `/api/monsters/?search=${search}&cr=${CR}&types=${type}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
