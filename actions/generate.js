import axios from "axios";

export const generateEncounter = async (formData) => {
  try {
    const res = await axios.post("/api/generate", formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
