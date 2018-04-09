import React from 'react';


class ListUsers extends React.Component{
    constructor(props){
        super(props);
        this._handleClick = this._handleClick.bind(this);
		this._handleClickOnUser = this._handleClickOnUser.bind(this);

	}


   _handleClick(event){
       event.preventDefault();
       this.props.handleClick("CreateUser");
   }

   _handleClickOnUser(id){
   		this.props.displaySub(true);
   		let links = this.props.linksSubUser;
   		let check = true;
   		links.forEach(link => {
   			if(link.idUser === id) {
   				check = false;
			}
		});
   		if(check) {
			this.props.formState.users.forEach(element => {
				if(id === element.iduser) {
					links.push({name: element.login, view: 'DisplayUser', idUser: id});
				}
			});
			this.props.addSub(links);
		}
		this.props.changeLoading(true);
		this.props.displayUser(id);
		this.props.handleClick("DisplayUser");
   }

    render(){
        return <div><table className="user">
			<thead   style={{ overflow: 'auto'}}>
			{this.props.formState.users.map(element => {
				return(
					<tr key={element.iduser} onClick={()=>this._handleClickOnUser(element.iduser)}>
						<td>{element.login}</td>
						<td>{element.name} {element.prenom}</td>
						<td>{element.description}</td>
					</tr>
				);
			})}
            </thead>
		</table>
			<button onClick={this._handleClick}>Créer utilisateur</button>
        </div>;
    }
}

export default (ListUsers);
