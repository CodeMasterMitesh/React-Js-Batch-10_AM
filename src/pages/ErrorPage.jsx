import React from 'react';
import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>  
            <div style={{ height: '200px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                </div>
                {/* <button onClick={() => navigate(-1)}>Go Back</button> */}
                <button onClick={() => window.history.back()}>Go Home</button>
            </div>

            
        </>
    );
};