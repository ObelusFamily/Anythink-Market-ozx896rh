const axios = require("axios")
const generateImage = async (prompt) => {
  const size = "256x256";
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      model: "image-alpha-001",
      prompt: prompt,
      size: size,
      response_format: "url",
    },
    { headers: headers }
  );

  return response.data.data[0].url;
};

const handleErrorResponse = (res, error) => {
  console.error(error);
  let message;
  if (error instanceof Error) {
    message = "An unexpected error occurred";
  } else {
    message = error.message || "Unknown error";
  }
  res.status(500).json({ message });
};

module.exports = { generateImage, handleErrorResponse };