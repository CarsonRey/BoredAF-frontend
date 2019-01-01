import React, { Component } from 'react';
import Form from '../components/Form'

const NewActivityContainer = (props) => {
    return(
        <Form context="NewActivityContainer" backToActivities={props.backToActivities}/>
    )
}

export default NewActivityContainer;
