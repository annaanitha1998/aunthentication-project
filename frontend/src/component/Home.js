import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Home() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        // set configurations for the API call here
        const configuration = {
            method: "get",
            url: "http://localhost:8000/api/user/home",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                // assign the message in our result to the message we initialized above
                setMessage(result.data.message);
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    }, []);



    return (
        <div>
            <h1 className="text-center">{message}</h1>
            <p className="text-danger text-center">{error}</p>
        </div>
    );
}