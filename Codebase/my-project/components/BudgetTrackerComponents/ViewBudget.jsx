import React from 'react';

const ViewBudget = (props) => {
	return (
		<>
            <div class="container">
                <div class='row'>
                    <div class='col-lg-12'>
			            <h5>Total Budget: ${props.budget}</h5>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-lg-12'>
                        <button type='button' class='btn btn-primary' onClick={props.handleEditClick}>
				        EDIT
			            </button>
                    </div>
                </div>
            </div>
		</>
	);
};

export default ViewBudget;