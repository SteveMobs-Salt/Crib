import React from 'react';
import {
    useHistory,
} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function CreateGroup() {
    const history = useHistory();

    const handleCreateGroup = e => {
        e.preventDefault();
        axios.post('/api/groups/create', {
            name: e.target.name.value,
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    return (
        <div className="join-group create">
            <div className="header">
                <nav>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="lg"
                        onClick={() => history.go(-1)}
                    />
                    <h2>Create group</h2>
                </nav>
            </div>
            <div className="form">


                <form onSubmit={e => handleCreateGroup(e)}>
                    <input type="text" placeholder="Enter group name.." name="name" />
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateGroup
