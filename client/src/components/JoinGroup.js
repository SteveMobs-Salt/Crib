import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    useHistory,
} from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function JoinGroup() {
    const { setHousehold } = useContext(HouseholdContext);
    const history = useHistory();

    const handleJoinGroup = e => {
        e.preventDefault();
        axios.post('/api/groups/join', {
            referral_code: e.target.referral_code.value,
            name: e.target.name.value,
        })
            .then(response => setHousehold(response.data))
            .catch(err => console.log(err));

        history.go(-1);
    }
// Search through users and find name - for object ID and name
    return (
        <div className="create-group">
            <div className="header">
                <nav>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="lg"
                        onClick={() => history.go(-1)}
                    />
                    <h2>Join Group</h2>
                </nav>
            </div>

            <form onSubmit={e => handleJoinGroup(e)}>
                <input required type="text" placeholder="Referral code" name="referral_code" />
                <input required type="text" placeholder="Your username" name="name" />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

export default JoinGroup;
