import React, { Component } from 'react';
import '../../../style/grid-layout.css';
import '../../../style/grid-rezisable.css';
import '../../../style/GridCreationClient.css';
import {Responsive, WidthProvider} from 'react-grid-layout';
import GridRequiredFormProvider from "./GridRequiredFormProvider";
import GridMethodOnFieldProvider from "./GridMethodOnFieldProvider";
import LoadingAnimation from "../../LoadingAnimation";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class GridCreationFournisseur extends Component {
	constructor(props) {
		super(props);
		this.props.changeLoading(true);
	}
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
				{
					this.props.loading && <LoadingAnimation/>
				}
				{
					!this.props.loading &&
					<div>
						<form action='/' onSubmit={this.props.handleSubmit}>

							<GridRequiredFormProvider requiredFields={this.props.requiredFields}
													  changeRequiredSup={this.props.changeRequiredSup}
							/>
							<ResponsiveReactGridLayout className="layout" layouts={this.props.layouts}
													   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
													   breakpoints={{lg: 1000, md: 900, sm: 768, xs: 480, xxs: 0}}
													   autoSize={true}
													   onDragStop={this.props.handleDrag} compactType={null}
													   onResizeStop={this.props.handleDrag}
							>
								{
									this.props.grid.map(element => {
										return (
											<div key={element.idattrfournisseur} className="form-group">
												<label htmlFor={element.label}
													   className="control-label">{element.label}</label>
												<input type="text" name={element.label} id={element.label}
													   className="form-control"
													   value={element.value} onChange={this.props.handleChangeInput}
													   placeholder={element.valeur_defaut}
												/>
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
														  data-target={"#" + element.idattrfournisseur + "modal"}/>
												}
											</div>
										);
									})
								}

							</ResponsiveReactGridLayout>
							<div className="form-group">
								<button className="buttonload btn btn-primary" type="submit">
									{
										this.props.loadingValidation &&
										<i className="fa fa-refresh fa-spin"/>
									}
									Valider
								</button>
							</div>
						</form>

						{
							this.props.isAdmin &&
							<GridMethodOnFieldProvider changeUpdateField={this.props.changeUpdateField}
													   formUpdateField={this.props.formUpdateField}
													   formNewField={this.props.formNewField}
													   deleteField={this.props.deleteField}
													   grid={this.props.grid}
													   handleModifyField={this.props.handleModifyField}
													   handleStatic={this.props.handleStatic}
													   handleNonStatic={this.props.handleNonStatic}
													   handleSubmitChamp={this.props.handleSubmitChamp}
													   champTypes={this.props.champTypes}
													   changeNewField={this.props.changeNewField}/>
						}
					</div>
				}
            </div>

        )
    }
}
