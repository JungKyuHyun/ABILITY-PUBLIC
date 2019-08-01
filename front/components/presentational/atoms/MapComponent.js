import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
/**
 * @author  신선하
 * @summary 지도 컴포넌트 --> 장소 검색 가능하게 수정예정
 * @usage
 **/
const style = {
  width: '98%',
  height: '100%'
}
export class MapComponent extends Component {
  constructor(props){
    super(props);

    this.state={
      map : 0,
      activeMarker : "",
      showingInfoWindow : "",
      selectedPlace : "",
    }
this.onClickMap = this.onClickMap.bind(this);
this.onClickMap2 =this.onClickMap2.bind(this);
}

  onClickMap(props){
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  onClickMap2(props, marker, e){
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {

    let xloc = this.props.xloc;
    let yloc = this.props.yloc;
          return (
          <>
          {xloc !== "" && yloc !== "" ?
            <Map google={this.props.google}
                style={style}
                initialCenter={{
                  lat: xloc,
                  lng: yloc
                }}
                center={{lat:xloc,lng:yloc}}
                zoom={15}
                onClick={this.onClickMap}
                >
              <Marker onClick={this.onClickMap2} 
                      name={this.props.name} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h6>{this.state.selectedPlace.name}</h6>
            </div>
        </InfoWindow>
            </Map>
          : ""}
          </>);
        }
  }

 
export default GoogleApiWrapper({
  apiKey: (""),
  language : "korean"
})(MapComponent)