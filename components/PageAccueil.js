import React, { Component } from 'react';
import '../style/App.css';
import HistoriqueContainer from "../containers/HistoriqueContainer";

class PageAccueil extends Component {

	
    render() {
        return (
            <div className="App container-fluid text-center">
                <div className="App-header">
                    <h2>Welcome  {this.props.formState.username}</h2>
                </div>

                <h2 className="titre-historique">Derniers dossiers consultés</h2>
                <HistoriqueContainer page='PageAccueil' history={this.props.history}/>
            </div>
        );
    } 
}

export default (PageAccueil);