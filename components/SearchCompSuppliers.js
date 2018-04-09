import React, {Component} from 'react';
import '../style/RechercheFournisseur.css';

class SearchCompSuppliers extends Component {

	constructor(props) {
		super(props);

		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeNomContact = this._changeNomContact.bind(this);
		this._changeCode = this._changeCode.bind(this);
		this._changeEmployesLilGroup = this._changeEmployesLilGroup.bind(this);
		this._changeEmployesBigGroup = this._changeEmployesBigGroup.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._reset = this._reset.bind(this);
	}


	_reset() {
//		e.preventDefault();
		let newFormState = {
			nomEntreprise: '',
			employesLilGroup: '',
			employesBigGroup: '',
			nomContact: '',
			code: ''
		};
		let form = document.getElementById("formFournisseurs").elements;
		this.props.changeForm(newFormState);
		for (let input in form) {
			if (form.hasOwnProperty(input) && form[input].value !== 'Reset') {
				form[input].value = '';
			}
		}
		this._filtre();
	}

	componentDidMount() {
		this._reset();
	}

	_filtre() {
		var inputAssuranceName, inputEmployesLilGroup, inputEmployesBigGroup,
			inputContactName, inputCode, table, tr, td0, td1, td2, td3, td4, i;

		inputAssuranceName = document.getElementById("AssuranceName").value.toUpperCase();
		inputEmployesLilGroup = parseInt(document.getElementById("EmployesLilGroup").value, 10);
		if (!inputEmployesLilGroup) {
			inputEmployesLilGroup = 0;
		}
		inputEmployesBigGroup = parseInt(document.getElementById("EmployesBigGroup").value, 10);
		if (!inputEmployesBigGroup) {
			inputEmployesBigGroup = 0;
		}
		inputContactName = document.getElementById("ContactName").value.toUpperCase();
		inputCode = document.getElementById("Code").value.toUpperCase();

		table = document.getElementById("PageFournisseursTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td0 = tr[i].getElementsByTagName("td")[0];
			td1 = tr[i].getElementsByTagName("td")[1];
			td2 = tr[i].getElementsByTagName("td")[2];
			td3 = tr[i].getElementsByTagName("td")[3];
			td4 = tr[i].getElementsByTagName("td")[4];
			if(td1 || td2 ) {
				if(td1.innerHTML === "Petits groupes non gérés") {
					td1 = 0;
				}
				else {
					td1 = parseInt(td1.innerHTML, 10);
				}
				if(td2.innerHTML === "Grands groupes non gérés") {
					td2 = 0;
				}
				else {
					td2 = parseInt(td2.innerHTML, 10);
				}
			}

			if (td0 || td1 || td2 || td3 || td4) {
				if (td4.innerHTML.toUpperCase().indexOf(inputCode) > -1 && td0.innerHTML.toUpperCase().indexOf(inputAssuranceName) > -1
					&& td3.innerHTML.toUpperCase().indexOf(inputContactName) > -1 &&
					inputEmployesLilGroup <= td1 && inputEmployesBigGroup <= td2) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}

	_changeEmployesBigGroup(event) {
		this._emitChange({...this.props.formState, employesBigGroup: event.target.value});
		this._filtre();
	}

	_changeEmployesLilGroup(event) {
		this._emitChange({...this.props.formState, employesLilGroup: event.target.value});
		this._filtre();
	}

	_changeNomContact(event) {
		this._emitChange({...this.props.formState, nomContact: event.target.value});
		this._filtre();
	}

	_changeNomEntreprise(event) {
		this._emitChange({...this.props.formState, nomEntreprise: event.target.value});
		this._filtre();
	}

	_changeCode(event) {
		this._emitChange({...this.props.formState, code: event.target.value});
		this._filtre();
	}

	_emitChange(newFormState) {
		this.props.changeForm(newFormState);
	}

	render() {

		return (
			<form action="" id="formFournisseurs">
				<div id="rechercheFournisseur">
					<input type="text" id="AssuranceName" placeholder="Nom entreprise"
						   onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise}/>
					<input type="number" id="EmployesLilGroup" placeholder="Nombre d'employés pour petits groupes"
						   onChange={this._changeEmployesLilGroup} value={this.props.formState.employesLilGroup} />
					<input type="number" id="EmployesBigGroup" placeholder="Nombre d'employés pour grands groupes"
						   onChange={this._changeEmployesBigGroup} value={this.props.formState.employesBigGroup}/>
					<input type="text" id="ContactName" placeholder="Nom d'un contact" onChange={this._changeNomContact}
						   value={this.props.formState.nomContact}/>
					<input type="text" id="Code" placeholder="Code" onChange={this._changeCode}
						   value={this.props.formState.code}/>
					<input type="reset" value="Reset" onClick={this._reset}/>
				</div>
			</form>
		);
	}
}

export default SearchCompSuppliers;
