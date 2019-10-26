import React, { useState } from 'react';
import io from 'socket.io-client';

const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

const Form = () => {
    const defaultState = { message: '' };
    const [message, setMessage] = useState(defaultState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeHandler = ({ target: { value } }) => {
        setMessage({ message: value });
        if(submitted) setSubmitted(false);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSubmitted(true);
        socket.emit('message', { ...message });
    };

    return (
        <div>
            <div id="wrapper">
            <form className="lower" onSubmit={onSubmitHandler}>
                <fieldset>
                    <p>Message</p>
                        <input type="textarea" placeholder="Message" onChange={onChangeHandler}
                            maxLength="100" required />
                    <button type="submit">
                        Submit
                    </button>
                    { submitted && <div>Submitted</div>}
                </fieldset>
            </form>
            </div>
        </div>
    )
};

export default Form;
