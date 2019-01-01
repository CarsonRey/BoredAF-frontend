import React, { Component } from 'react';
import Form from '../components/Form'

const NewJournalEntryContainer = (props) => {
    return(
        <Form context="NewJournalEntryContainer" backToActivities={props.backToActivities}/>
    )
}

export default NewJournalEntryContainer;
