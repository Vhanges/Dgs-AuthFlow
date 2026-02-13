const profile = {
  getProfile: async (token) => {
    console.log("MY TOKEN", token);

    const response = await fetch(`/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  },
};

export default profile;
