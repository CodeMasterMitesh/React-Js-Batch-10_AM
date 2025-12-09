import React from "react";

export const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '20px', background: '#f1f1f1' }}>
            &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </footer>
    );
}