import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function CreateGroup() {
  const {
    setHousehold,
    user,
    household: { categories },
  } = useContext(HouseholdContext);
  const history = useHistory();
  const [referral, setReferral] = useState(null);

  const handleCreateGroup = e => {
    e.preventDefault();
    axios
      .post('/api/groups/create', {
        name: e.target.name.value,
      })
      .then(response => {
        // respose.data = group ref
        console.log(response);
        setReferral(response.data);
      })
      .catch(err => console.log(err));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Crib - Join Group',
          text: `${user.name} invited you to join their household. Your referral code is: ${referral}`,
          url: 'https://desolate-hollows-89856.herokuapp.com/',
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    }
  };

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
      {referral ? (
        <div className="referral" type="button" onClick={() => handleShare()}>
          {' '}
          Your group's referral code: <span className="code">{referral}</span>
        </div>
      ) : (
        <div className="form">
          <form onSubmit={e => handleCreateGroup(e)}>
            <input type="text" placeholder="Enter group name.." name="name" />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateGroup;
