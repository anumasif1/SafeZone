import React from 'react';

function SocketAlert(props) {
    return (
        <div style={props.style} className="alert alert-success" id="socketNotification">
            {props.value}
        </div>
    )
}

export default SocketAlert;