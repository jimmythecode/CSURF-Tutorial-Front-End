import React, { useEffect, useState } from 'react'

export default function CsurfTutorial() {
    const domainUrl = 'http://localhost:5000';
    const [csrfTokenState, setCsrfTokenState] = useState('');
    const [haveWeReceivedPostResponseState, setHaveWeReceivedPostResponseState] = useState("not yet")

    async function getCallToForm() {
        const url = '/form';
        let fetchGetResponse = await fetch(`${domainUrl}${url}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            mode: 'cors'
        })
        let parsedResponse = fetchGetResponse.json();
        setCsrfTokenState(parsedResponse)
    }

    useEffect(() => {
        getCallToForm();
    }, [])

    async function testCsurfPostClick() {
        const url = '/process';
        let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfTokenState,
            },
            credentials: "include",
            mode: "cors"
        })
        let parsedResponse = await fetchPostResponse.text();
        setHaveWeReceivedPostResponseState(parsedResponse);
    }

    return (
        <div>
            <button onClick={testCsurfPostClick}>Test Post Call to Server</button>
            <p>csrf Token is: {csrfTokenState}</p>
            <p>Have we successfully navigated though post request?: {haveWeReceivedPostResponseState}</p>
        </div>
    )
}
