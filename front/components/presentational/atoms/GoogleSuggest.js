import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { InputTextBox } from "./InputboxComponent";

/**
 * 
 * @author 곽호원
 * @summary 도시 검색시 자동완성 컴포넌트 
 *  
 */
const MY_API_KEY = "" 

export default class GoogleSuggest extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            search: this.props.search,
            value: this.props.value,
        }
    }
 
    handleInputChange = (e) => {
        this.setState({search: e.target.value, value: e.target.value});
        
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        this.setState({search: "", value: geocodedPrediction.formatted_address})
        
    }
    

    render() {
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                    key: "",
                    libraries: "",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <ReactGooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                            }}
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            onStatusUpdate={this.handleStatusUpdate}
                            textNoResults="My custom no results text" 
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >

                            <InputTextBox type="text"
                                          value={value}
                                          onChange={this.handleInputChange}
                                          id={this.props.id}
                                          placeholder={this.props.placeholder}
                            /> 
                        </ReactGooglePlacesSuggest>
                    )
                }
            />
        )
    }
}