import React from 'react';

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === 'danger') {
            word = 'error'
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return (<div style={{ height: '60px', marginTop: '3.5rem' }}> {props.alert && <div>
        {/* <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={{ position: 'absolute' }} role="alert"> */}
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong>! {props.alert.msg}
        </div>
    </div>}
    </div>)
}
