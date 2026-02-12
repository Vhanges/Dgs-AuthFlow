
const api = import.meta.env.VITE_API_BASE_URL;

const profile =  {

    getProfile: async (token) => {

        console.log("MY TOKEN", token);

        const response = await fetch(
            `${api}/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            }
        );

        const data = await response.json();

        return data;
    }
}

export default profile;
