import React from 'react'
import Alert from 'react-bootstrap/Alert';
const AlertMessage = (props) => {
    const {info} = props;

    return info === null ? null : (<Alert variant={info.type}>{info.message}</Alert>);
}

export default AlertMessage;