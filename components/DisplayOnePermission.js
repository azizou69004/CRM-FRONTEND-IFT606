import React from 'react';

export class DisplayOnePermission extends React.Component{

    constructor(props){
        super(props);
        this._handleClick=this._handleClick.bind(this);
    }

    componentDidUpdate(){
        this.props.formState.operations.forEach(element => {
            if(this.props.level === element.value){
                document.getElementById(element.label + this.props.id).checked = true;
            }
        })
    }

    _handleClick(event){
        let position;
        for(let i = 0; i < this.props.formState.userPerms.length; i++){
            if(this.props.formState.userPerms[i].group === this.props.group) {
                position = i;
            }
        }
        this.props.updateUserPerms(position,  parseInt(event.target.value, 10));
    }

    render(){
        return (
        	<fieldset className=" container">
				<div className="form-group row"><span className="col-2">Droit de</span>
                <form>
                {this.props.formState.operations.map(element => {
                    return (
                    	<div className="form-check text-left" key={element.label + element.id}>
							<input className="form-check-input"
								   type="radio"
								   name="droit"
								   value={element.value}
								   id={element.label + this.props.id}
								   onClick={this._handleClick}/> {element.label}
							<br />
						</div>);
                })
                }
                </form>
					<span className="">sur le module {this.props.group}</span>
				</div>
			</fieldset>
        )
    }
}
