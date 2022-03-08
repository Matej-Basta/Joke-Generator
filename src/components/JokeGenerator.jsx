import React, {useEffect, useState} from "react";

function JokeGenerator() {

    const [joke, setJoke] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [response, setResponse] = useState("");
    const [responseLoaded, setResponseLoaded] = useState(false);

    const fetchData = async () => {

        setResponse("");
        setResponseLoaded(false);

        const response = await fetch("https://v2.jokeapi.dev/joke/Any");
        const data = await response.json();
        console.log(data);

        if (data.type === "single") {
        setJoke(data.joke);
        setDataLoaded(true);
        } else {
            setJoke(data.setup);
            setDataLoaded(true);

            const id = setTimeout(() => {
                setResponse(data.delivery);
                setResponseLoaded(true);
            }, 5000);

            // return clearInterval(id);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        {!dataLoaded ? 
        <p>Loading</p> :
        <h2>{joke}</h2>
        }
        {!responseLoaded ? 
        <div></div> :
        <h1>{response}</h1>
    }
        <button onClick={() => fetchData()}>Generate new joke</button>
        </>
    );
}

export default JokeGenerator;