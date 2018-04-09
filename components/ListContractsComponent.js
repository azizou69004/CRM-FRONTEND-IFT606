import React from 'react';

class ListContractsComponent extends React.Component {
	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this);
		this._hardReset = this._hardReset.bind(this);
		this._filtre = this._filtre.bind(this);
	}

	_handleClick(contract) {
		let links = this.props.linksSubContract;
		let check = true;
		links.forEach(link => {
			if(link.idContract === contract.idcontrat) {
				check = false;
			}
		});
		if(check) {
			this.props.listContracts.forEach((element, index) => {
				let duplicate = false;
				this.props.listContracts.forEach((element2, index2)=> {
					if(element.idcontrat === element2.idcontrat && index > index2) {
						duplicate = true;
					}
				});
				if(!duplicate && contract.idcontrat === element.idcontrat) {
					links.push({name: element.police, view: 'display', idContract: contract.idcontrat});
				}
			});
			this.props.addSubContractNav(links);
		}
		this.props.changeViewContract("display");
		this.props.displaySubContractNav(true);
		this.props.getContract(contract.idcontrat);
	}

	_handleClickHead(n) {
		let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		let table = document.getElementById("PageContractsTable");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("TR");
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[n];
				y = rows[i + 1].getElementsByTagName("TD")[n];
				if (dir === "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir === "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount === 0 && dir === "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}

	_handleChange(event) {
		let search = this.props.searchContracts;
		search[event.target.id] = event.target.value;
		this.props.changeSearchContracts(search);
		this._filtre();
	}

	_hardReset() {
		let search = {
			numeroPolice: '',
			nomClient: '',
			nomAssureur: '',
			moisRenouvellement: ''
		};
		this.props.changeSearchContracts(search);
	}

	componentDidUpdate() {
		this._filtre();
	}

	_filtre() {
		let inputNumeroPolice, inputNomAssureur, inputNomClient, inputMoisRenouvellement,
			table, tr, td0, td1, td2, td3, i;

		inputNomClient = this.props.searchContracts.nomClient.toUpperCase();
		inputNumeroPolice = this.props.searchContracts.numeroPolice.toUpperCase();
		inputNomAssureur = this.props.searchContracts.nomAssureur.toUpperCase();
		inputMoisRenouvellement = this.props.searchContracts.moisRenouvellement.toUpperCase();

		table = document.getElementById("PageContractsTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td0 = tr[i].getElementsByTagName("td")[0];
			td1 = tr[i].getElementsByTagName("td")[1];
			td2 = tr[i].getElementsByTagName("td")[2];
			td3 = tr[i].getElementsByTagName("td")[3];
			if (td0 || td1 || td2 || td3) {
				if (td3.innerHTML.toUpperCase().indexOf(inputMoisRenouvellement) > -1 && td0.innerHTML.toUpperCase().indexOf(inputNumeroPolice) > -1
					&& td2.innerHTML.toUpperCase().indexOf(inputNomAssureur) > -1 && td1.innerHTML.toUpperCase().indexOf(inputNomClient) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}

	render(){
		return (
			<div className="text-center">
				<div>
					<h1>Liste des contrats</h1>
					<div className="table-responsive">
						<table className="table" id="PageContractsTable">
							<thead>
							<tr>
								<th onClick={this._handleClickHead.bind(this, 0)}>N° Police</th>
								<th onClick={this._handleClickHead.bind(this, 1)}>Client</th>
								<th onClick={this._handleClickHead.bind(this, 2)}>Assureur</th>
								<th onClick={this._handleClickHead.bind(this, 3)}>Mois de renouvellement</th>
							</tr>
							</thead>
							<tbody>
							{
								
								this.props.listContracts.map((contract, index) => {
									return (
									<tr key={index} onClick={this._handleClick.bind(this, contract)}>
										<td>{contract.police}</td>
										<td>{contract.nom_client}</td>
										<td>{contract.nom_fournisseur}</td>
										<td>{contract.mois_renouvellement}</td>
									</tr>
									)
								})
							}
							</tbody>
						</table>
					</div>
					<div>
						<form action="" id="recherche" className="container-fluid">
							<input type="text" id="numeroPolice" placeholder="N° police"
								   onChange={this._handleChange}
								   value={this.props.searchContracts.numeroPolice}
							/>
							<input type="text" id="nomClient" placeholder="Nom client"
								   onChange={this._handleChange}
								   value={this.props.searchContracts.nomClient}
							/>
							<input type="text" id="nomAssureur" placeholder="Assureur"
								   onChange={this._handleChange}
								   value={this.props.searchContracts.nomAssureur}
							/>
							<input type="text" id="moisRenouvellement" placeholder="Mois renouvellement"
								   onChange={this._handleChange}
								   value={this.props.searchContracts.moisRenouvellement}
							/>

							<input type="reset" value="Reset" id="reset" onClick={this._hardReset}/>

						</form>
					</div>
					<button onClick={this.props.handleClick} value="create">Créer contrat</button>
				</div>
		</div>
		);
	}

}


export default (ListContractsComponent)
