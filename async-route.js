import React from "react";
import Loading from 'react-loading';

export default function asyncRoute(loadComponent) {

    if (!loadComponent || typeof loadComponent !== "function") {
        throw new Error(loadComponent + ' is not a function');
    }

    return class AsyncComponent extends React.Component {

        constructor(props) {
            super(props);

            // Init state with a null component 
            this.state = {
                Component: null
            }

        }

        componentWillMount() {

            if (AsyncComponent.Component) {

                this.state = {
                    Component: AsyncComponent.Component
                };

            } else {

                // Load asynchronuously the component route and update the state
                loadComponent()
                    .then(Component => {

                        Component = Component.default || Component;

                        AsyncComponent.Component = Component;
                        this.setState({ Component })
                         setTimeout(
                             () => this.setState({ Component }),
                             3000
                         );
                    });
            }

        }

        render() {
            const { Component } = this.state;
            {/*return Component ? <Component {...this.props} /> : <Loading type="spin" color="green" height={100} width={100} />;*/}
            return Component ? <Component {...this.props} /> : null;
        }

    };

}