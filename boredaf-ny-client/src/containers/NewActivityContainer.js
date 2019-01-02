import React from 'react';
import Form from '../components/Form'

const NewActivityContainer = (props) => {
    return(
        <Form 
        context="NewActivityContainer"
        newActivity={props.newActivitySubmitHandler} />
    )
}

export default NewActivityContainer;
