import React, { Component } from 'react';

class NavBarLink extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleResetState = this._handleResetState.bind(this);
        this.state = {
        	deleted: false
		};
    }

    _handleClick() {
        this.props.handleClick(this.props.id);
        if(this.props.resetView && !this.state.deleted){
            this.props.resetView(this.props.reset);
        }
        if(this.props.idUser) {
        	this.props.changeLoading(true);
        	this.props.displayUser(this.props.idUser);
		}
		if(this.props.idCustomer) {
        	this.props.changeLoading(true);
			this.props.displayUser(this.props.idCustomer);
		}
		if(this.props.idSupplier && !this.state.deleted) {
        	this.props.changeLoading(true);
        	this.props.displayUser(this.props.idSupplier);
		}
		if(this.props.idContract) {
			this.props.changeLoading(true);
			this.props.displayUser(this.props.idContract);
		}
		this._handleResetState();
    }

    _handleResetState() {
    	if(this.props.resetFor === "contract") {
    		this.props.resetState({
				idClient: false,
				name: '',
				sousGroupe: '',
				nombreEmployes: ''
			});
		}
	}

    _handleDelete() {
		this.setState({deleted: true}, () => {
			if(this.props.idUser) {
				this.props.deleteSub(this.props.idUser);
			}
			if(this.props.idCustomer) {
				this.props.deleteSub(this.props.idCustomer);
			}
			if(this.props.idSupplier) {
				this.props.deleteSub(this.props.idSupplier);
			}
			if(this.props.idContract) {
				console.log(this.state.deleted);
				this.props.deleteSub(this.props.idContract);
			}
		});
	}

    render() {
        let link;
        if(this.props.view === this.props.id && this.props.menu !== "subMenu") {
            link = (<div onClick={this._handleClick} className="link active text-center" id={this.props.id}>
                             {"  " + this.props.name}
                        </div>)
        }
        else if (this.props.menu === "subMenu") {
			link = (<div onClick={this._handleClick} className="link text-center" id={this.props.id}>
				<span className="fa fa-minus-circle" onClick={this._handleDelete}/>
				{"  " + this.props.name}
			</div>)
		}
        else {
            link = (<div onClick={this._handleClick} className="link text-center" id={this.props.id}>
                 {"  " + this.props.name}
            </div>)
        }
        return (
                link
        );
    }
}

export default NavBarLink;
