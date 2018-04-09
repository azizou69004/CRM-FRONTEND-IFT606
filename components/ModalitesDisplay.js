import React from 'react';
import DisplayOneModalite from './DisplayOneModalite';

class ModalitesDisplay extends React.Component{
	constructor(props){
		super(props);
		/*this.props.formState.modules.forEach(element=>{
			if(parseInt(element.idModule,10)===parseInt(this.props.idModule, 10)){
				this.state=({modalites: element.modalites});
				console.log(this.state.modalites);
				//this.state.modalites = element.modalites;
			}
		});*/
		this.modalites=[];
	}








	componentDidUpdate(){

	}


	render(){
		this.props.formState.modules.forEach(element=>{
			if(parseInt(element.idModule,10)===parseInt(this.props.idModule, 10)){
				this.modalites= element.modalites;
				//this.state.modalites = element.modalites;
			}
		});

		return <div className="d-flex flex-wrap justify-content-around">
			{
				this.modalites.map(element=>{
					return <DisplayOneModalite key={element.idModalite} modalite={element} modalites={this.modalites}
											   view={this.props.view}
												idModule={this.props.idModule} formState={this.props.formState}
											   changeForm={this.props.changeForm}/>
				})
			}
		</div>
	}
}

export default (ModalitesDisplay);
