import { getToken } from "./authenticate";

export  async function addToFavourites(id) {
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": `JWT ${token}`
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
} 

export  async function removeFromFavourites(id) {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Authorization": `JWT ${token}`
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
} 

export  async function getFavourites() {
    const token = await getToken();
    console.log(token)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `JWT ${token}`
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
} 

export  async function addToHistory(id) {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "Authorization": `JWT ${token}`
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
} 


export  async function removeFromHistory(id) {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Authorization": `JWT ${token}`
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
} 

export  async function getHistory() {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `JWT ${token}`
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
} 