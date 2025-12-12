import React from "react";
export const NewsApi = async () => {
    console.log(import.meta.env);
    // Vite exposes env vars via import.meta.env and they must be prefixed with VITE_
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    if (!apiKey) {
        console.warn("NEWS_API_KEY is missing. Set VITE_NEWS_API_KEY in your .env file.");
        return { results: [] };
    }

    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=sports`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching news data:", error);
        return { results: [] }; // Return empty results on error
    }
};