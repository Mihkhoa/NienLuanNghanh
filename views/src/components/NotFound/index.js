import React from 'react';
import "./notfound.css";
import { Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';

function NotFound() {
    return (
        <div className="notfound">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary">
                        <NavLink to="/">Back Home</NavLink>
                    </Button>
                }
            />,
        </div>
    );
}

export default NotFound;