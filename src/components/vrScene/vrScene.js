import 'aframe-animation-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DynamicElements from './dynamicElements.js'
import SwordMixin from './mixins/swordMixin.js'
import OrcMixin from './mixins/orcMixin.js'
import BigOrcMixin from './mixins/bigOrcMixin.js'
import {PlayerCursorMixin, PlayerTouchMixin} from './mixins/playerMixin.js'


class VrScenePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dynamicElements: []
        };
    }

    // Document ready
    componentDidMount() {
      this.axiosFunction(`scene-setup.json`, 'testFunction');
    }

    // Make request for JSON
    axiosFunction = (url, responseFunction) => {
      axios.get(url)
       .then(response => {
         const json = response.data;

         this.jsonToArray(json);
       });
    }

    // convert JSON to array for use later
    jsonToArray = (json) => {
      const elementList = [];

      for (const list in json) {
        for (const item in json[list]) {
          const attrList = [];

          for (const attr in json[list][item]) {
            for (const key in json[list][item][attr]) {
              let value = json[list][item][attr][key];
              attrList.push([key, value]);
            }
          }
          elementList.push(attrList);
        }
      }

      this.setState({ dynamicElements: elementList })
    }

    render() {
        return (
          <Scene physics="driver: worker" environment="shadow: true">
            {/*=== Assets ===*/}
            <a-assets>
              {/*=== Images ===*/}
              <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" alt="floor" crossOrigin="anonymous"/>
              <img id="skyTexture" src="img/sky.png" alt="sky" crossOrigin="anonymous"/>
              <SwordMixin />
              <OrcMixin />
              <BigOrcMixin />
              <PlayerCursorMixin />
              <PlayerTouchMixin />
            </a-assets>

            {/*=== Controls ===*/}
            <Entity progressive-controls="gazeMixin: mycursor; touchMixin: mytouch; override: true">
              {/*=== listing controller entities to set IDs for MoCap replay optional for normal use ===*/}
              <a-entity id="rhand" class="right-controller"></a-entity>
              <a-entity id="lhand" class="left-controller"></a-entity>
            </Entity>

            {/*=== Sky ===*/}
            <a-sky height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"></a-sky>

            {/*=== Ground ===*/}
            <a-box id="ground-collider" static-body width="100" height="1" depth="100" visible="false" position="0 -0.5 0"></a-box>

            {/*=== Sword ===*/}
            {/*===<Entity id="sword"
            mixin="sword"
            position="0 1 -0.5"
            color="#7F7F7F"
            data-damage="3"
            dynamic-body="shape: box; cylinderAxis: x; mass: 5">
            </Entity>===*/}

            {/*=== Camera ===*/}
            <Entity camera="userHeight: 1.6" look-controls></Entity>

            {/*=== dynamicElements ===*/}
            <DynamicElements elements={this.state.dynamicElements} />

          </Scene>
        );
    }
}

export default VrScenePage;
