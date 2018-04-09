import React from 'react';
import ContractInput from '../components/ContractInput';

class ContractRemunerationContainer extends React.Component {
	constructor(props) {
		super(props);
		this._onChangeConseiller = this._onChangeConseiller.bind(this);

	}

	componentDidMount() {
		document.getElementById("inputgtotalremuneration").setAttribute('disabled', true);
		document.getElementById("inputsolderemuneration").setAttribute('disabled', true);

	}

	_onChangeConseiller(event) {
		this.props.changeForm({
			...this.props.formState, contrat: {
				...this.props.formState.contrat,
				remuneration: {...this.props.formState.contrat.remuneration, idConseiller: event.target.value}
			}
		});


	}

	render() {
		return <div>
			<h4>Rémunération</h4>
			<div className="container" style={{paddingBottom:0, marginBottom:0}}>
				<div className="row col-12" style={{paddingBottom:0, marginBottom:0}}>
					<div className="col-4" style={{paddingBottom:0, marginBottom:0}}>

						<ContractInput titre="Vie,DMA,PAC" unite="%" format="XX,X" titreChamp="vie"
									   description="Taux de commission: Vie, DMA, PAC" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="CT" unite="%" format="XX,X" titreChamp="ct"
									   description="Taux de commission: invalidité de courte durée" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="LT" unite="%" format="XX,X" titreChamp="lt"
									   description="Taux de commission: invalidité de longue durée" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="AMC" unite="%" format="XX,X" titreChamp="amc"
									   description="Taux de commission: AMC" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Dentaire" unite="%" format="XX,X" titreChamp="dent"
									   description="Taux de commission: dentaire" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="MG" unite="%" format="XX,X" titreChamp="mg"
									   description="Taux de commission: maladies graves" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
					</div>
					<div className="col-4">

						<ContractInput titre="PAE" unite="%" format="XX,X" titreChamp="pae"
									   description="Taux de commission: PAE" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Reçu" unite="" format="AAAA-MM-JJ" titreChamp="recu"
									   description="Date payée: base" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Base" unite="$" format="XXX XXX,XX" titreChamp="base"
									   description="Montant payé: base" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Boni" unite="$" format="XXX XXX,XX" titreChamp="boni"
									   description="Montant payé: boni" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Total" unite="$" format="XXX XXX,XX" titreChamp="total"
									   description="Rémunération totale" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Grand total" unite="$" format="XXX XXX,XX" titreChamp="gtotal"
									   description="Rémunération totale" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
					</div>
					<div className="col-4">

						<div className="form-group row">
							<label id="representantLabel" className="col-form-label col-3">Conseiller</label>
							<div className="col-9"><select
								id="conseiller"
								name="conseiller"
								className="form-control col-sm-8"
								value={this.props.formState.contrat.remuneration.idConseiller}
								onChange={this._onChangeConseiller}
							>
								<option disabled value=""> -- Veuillez sélectionner une valeur --</option>
								{
									this.props.formState.employesAFC.map((employe, index) => {
										return <option key={index}
													   value={employe.idemploye}>{employe.prenom} {employe.nom}</option>
									})
								}
							</select></div>
						</div>
						<ContractInput titre="Split" unite="%" format="XX,X" titreChamp="split"
									   description="Pourcentage payable en %"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Montant dû" unite="$" format="XX XXX,XX" titreChamp="bdu"
									   description="Indiquer le montant dû"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Montant payé" unite="$" format="XX XXX,XX" titreChamp="paye"
									   description="Indiquer le montant payé"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Date payée" unite="" format="AAAA-MM-JJ" titreChamp="dpaye"
									   description="Date payée" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
						<ContractInput titre="Solde" unite="$" format="" titreChamp="solde"
									   description="Montant dû - montant payé" part="remuneration"
									   formState={this.props.formState} changeForm={this.props.changeForm}/>
					</div>
				</div>
			</div>
			<ContractInput titre="Notes" unite="" format="Informations supplémentaires" titreChamp="notes"
						   description="Informations supplémentaires" part="remuneration"
						   formState={this.props.formState} changeForm={this.props.changeForm}/>

		</div>
	}
}

export default (ContractRemunerationContainer);
