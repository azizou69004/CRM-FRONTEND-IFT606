import React from 'react';
import {DisplayOnePermission} from '../components/DisplayOnePermission';

class CreateUserPermissions extends React.Component{


    constructor(props) {
		super(props);
		this.toReturn = '';
	}

    render(){
        let permUser = JSON.parse(JSON.stringify(this.props.formState.userPerms));
        this.toReturn = permUser.map(element => {
            return(
                <DisplayOnePermission key={element.id} id={element.id} group={element.group} level={element.level}
									  formState={this.props.formState} changeForm={this.props.changeForm}
									  updateUserPerms={this.props.updateUserPerms}/>
            )});
        return (<div className="container-fluid">
			<div className="form-group row">
				<label className="col-sm-3 col-form-label" >Permissions :</label><br />
				<div className="col-9 text-center">
					{
					   this.toReturn
				   }
				</div>
			</div>
		</div>) ;
    }
}

export default CreateUserPermissions;
