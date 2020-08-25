import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    useHistory,
    useParams,
} from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function EditBudget() {
    const {
        setHousehold,
        household,
        selectedHousehold
    } = useContext(HouseholdContext);
    const history = useHistory();
    const { category } = useParams();
    let id;
    if (household) {
        ({ _id: id } = household[selectedHousehold]);
    }

    const handleEditBudget = e => {
        e.preventDefault();
        axios.put(`/budget?category=${e.target.category.value}&amount=${parseFloat(e.target.amount.value)}&id=${id}&previousCategory=${category}`)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        history.go(-3);
    }

    return (
        <div className="create-group">
            <div className="header">
                <nav>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="lg"
                        onClick={() => history.go(-1)}
                    />
                    <h2>Edit {category}</h2>
                </nav>
            </div>

            <form onSubmit={e => handleEditBudget(e)}>
                <input type="text" placeholder="Budget Name" name="category" />
                <input type="number" step="0.01" min="0" placeholder="Amount" name="amount" />
                <button type="submit" >Edit</button>
            </form>
        </div>
    )
}

export default EditBudget;
