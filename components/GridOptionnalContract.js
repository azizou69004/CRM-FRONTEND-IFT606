import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {Button} from 'react-bootstrap';
import GridMethodOnFieldContract from "./form/GridMethodOnFieldContract";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class GridOptionnalContract extends React.Component {
	constructor(props) {
		super(props);
		this._handleStatic = this._handleStatic.bind(this);
		this._handleNonStatic = this._handleNonStatic.bind(this);
		this._handleDrag = this._handleDrag.bind(this);
		this._handleChange = this._handleChange.bind(this);
	}

	_handleStatic() {
		let layout = this.props.lilLayout.map(div => {
			return {...div, static: true};
		});
		this.props.changeLilLayout(layout);
	}

	_handleNonStatic() {
		let layout = this.props.lilLayout.map(div => {
			return {...div, static: false};
		});
		this.props.changeLilLayout(layout);
	}

	_handleDrag(newItem) {
		let bigLayout = this.props.bigLayout;
		this.props.updatePosLayout(newItem, bigLayout);
	}

	_handleChange(event) {
		let grid = this.props.formState.facultatif;
		let facultatif = grid.map(champ => {
			if(event.target.id === champ.label) {
				return {...champ, value: event.target.value};
			}
			else {
				return champ;
			}
		});
		this.props.setGrid(facultatif);
	}

	render(){
		let layout = this.props.lilLayout;
		let layouts = {lg:layout, md:layout, sm:layout, xs:layout, xxs:layout};
		return <div>
			<ResponsiveReactGridLayout className="layout" layouts={layouts} rowHeight={20}
									   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
									   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
									   autoSize = {true}
									   onDragStop={this._handleDrag} onResizeStop={this._handleDrag}
			>
				{
					this.props.formState.facultatif.map(element => {
						return (
							<div key={element.idattrcontratcoll} className="form-group">
								<label htmlFor={element.label}
									   className="control-label">{element.label}</label>
								{
									element.libelletype === 'Booléen' &&
									<select className="form-control" id={element.label} name={element.label}
											required value={element.value} onChange={this._handleChange}>
										<option value="">-- Veuillez choisir une valeur --</option>
										<option value="Oui">Oui</option>
										<option value="Non">Non</option>
									</select>
								}
								{
									!(element.libelletype === 'Booléen') &&
									<input type="text" name={element.label} id={element.label}
										   className="form-control"
										   value={element.value} onChange={this._handleChange}
										   placeholder={element.valeur_defaut}
									/>
								}
								<div className="tooltipp" style={{
									cursor: "pointer",
									position: 'absolute',
									left: '2px',
									top: 0
								}}>
									<span className="fa fa-info"/>
									<span className="tooltipptext">{element.description}</span>
								</div>
								{
									this.props.isAdmin &&
									<span className="fa fa-pencil" style={{
										cursor: "pointer",
										position: 'absolute',
										right: '2px',
										top: 0
									}}
										  data-toggle="modal"
										  data-target={"#" + element.idattrcontratcoll + "modal"}/>
								}
							</div>

						);
					})
				}
			</ResponsiveReactGridLayout>
			<Button onClick={this._handleStatic}>Rendre le grid static</Button>
			<Button onClick={this._handleNonStatic}>Rendre le grid non-static</Button>
			<GridMethodOnFieldContract changeNewField={this.props.changeNewField}
									   newField={this.props.newField}
									   formState={this.props.formState}
									   types={this.props.types}
									   handleSubmitChamp={this.props.handleSubmitChamp}
			/>
		</div>;
	}
}

export default (GridOptionnalContract);
