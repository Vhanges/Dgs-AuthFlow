const api = import.meta.env.VITE_API_BASE_URL;

const gallery =  {

    getGallery: async (token) => {


        const response = await fetch(
            `${api}/upload`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        return data.data;
    },

}

export default gallery;
