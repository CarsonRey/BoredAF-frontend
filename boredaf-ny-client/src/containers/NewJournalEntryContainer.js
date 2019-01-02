import React from 'react';
import Form from '../components/Form'

const NewJournalEntryContainer = (props) => {
    return(

        <Form
          user={props.user}
          activityId={props.activityId}
          context="NewJournalEntryContainer" backToActivities={props.backToActivities}/>
    )
}

export default NewJournalEntryContainer;
