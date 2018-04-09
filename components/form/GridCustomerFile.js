import React, { Component } from 'react';
import '../../style/grid-layout.css';
import '../../style/grid-rezisable.css';
import '../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
import TitreValeur from "../TitreValeur";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCustomerFile extends Component {
	constructor(props) {
		super(props);
		this._handleModify = this._handleModify.bind(this);
	}

	_handleModify(event) {
		this.props.handleModify(event.target.id);
	}

	render() {
		return (
			<div>
				<h1>Fiche Client</h1>
				<form action='/' >
					<ResponsiveReactGridLayout className="layout" layouts={this.props.layouts} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
											   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}} autoSize={true}
											   compactType={null} >
						{
							this.props.grid.map(element => {
								return (
									<div key={element.key} className="form-group">
										<TitreValeur titre={element.nom} valeur={element.value}/>
									</div>
								);
							})
						}

					</ResponsiveReactGridLayout>
				</form>

				<button className="btn btn-dark" id="write" onClick={this._handleModify}>Modifier la fiche client</button>

			</div>

		)
	}
}
