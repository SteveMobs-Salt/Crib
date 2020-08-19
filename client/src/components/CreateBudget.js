import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
} from 'react-router-dom';

function CreateBudget() {
    const history = useHistory();
    return (
        <div>
            <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
            <h2>Create Budget</h2>
            <form>
                <input name="category" type="text" placeholder="Budget type"/>
                <input name="amount" type="number" min="0" placeholder="Amount" />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default CreateBudget
