import React from "react";

const Greeting = ({ textRef, displayed }) => {
    return (
        <p
            // ref={textRef}
            className="text-center text-3xl font-mono whitespace-pre-wrap"
            style={{ color: '#fff', display: 'inline-block' }}
        >
            {displayed}
        </p>
    );
};

export default Greeting;
