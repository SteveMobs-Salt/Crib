import React , { useContext }from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
} from 'react-router-dom';
import axios from 'axios';
import HouseholdContext from '../contexts/HouseholdContext';

function CreateBudget() {
    const history = useHistory();
    const { setHousehold } = useContext(HouseholdContext);

    // REDIRECT AFTER POST
    const handleCreateBudget = event => {
        event.preventDefault();
        const body = {
            category: event.target.category.value,
            amount: parseInt(event.target.amount.value)
        }
        axios.post('/budget', body)
            .then( data => {
                console.log(data);
                return data;
            })
            .then(res => {
                setHousehold(res)
                history.go(-2)
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
            <h2>Create Budget</h2>
            <form onSubmit={(event) => handleCreateBudget(event)}>
                <input name="category" type="text" placeholder="Budget type"/>
                <input name="amount" type="number" min="0" placeholder="Amount" />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default CreateBudget
