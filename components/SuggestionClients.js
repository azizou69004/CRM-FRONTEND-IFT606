import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../style/Suggestion.css';

class SuggestionClients extends React.Component {
	constructor(props) {
		super(props);
		this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.getSuggestionValue = this.getSuggestionValue.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.state = {
			value: '',
			suggestions: []
		};
		if(this.props.client) {
			this.props.getClient(this.props.client.idClient);
		}
	}

	// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
	escapeRegexCharacters(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	getSuggestions(value) {
		const escapedValue = this.escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const regex = new RegExp('^' + escapedValue, 'i');

		return this.props.clients.filter(client => regex.test(client.nom_groupe));
	}

	getSuggestionValue(suggestion) {
		this.props.getClient(suggestion.id);
		this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat, idClient:suggestion.id}});
		return suggestion.nom_groupe;
	}

	renderSuggestion(suggestion) {
		return (
			<span>{suggestion.nom_groupe}</span>
		);
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});

	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const disabled = true;
		let inputProps;
		if(this.props.client) {
			inputProps = {
				placeholder: "Tapez le nom d'un client",
				value: this.props.client.name,
				onChange: this.onChange,
				disabled,
			};
		}
		else {
			inputProps = {
				placeholder: "Tapez le nom d'un client",
				value,
				onChange: this.onChange
			};
		}

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={inputProps} />
		);
	}
}

export default SuggestionClients;
