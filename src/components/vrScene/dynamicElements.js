import React from 'react';
import {Entity} from 'aframe-react';

class DynamicElements extends React.Component {
    render() {
        const array = [];

        this.props.elements.map(function(value){
          const attrs = {};

          value.forEach(function(currentValue, index) {
            attrs[currentValue[0]] = currentValue[1];
          })
          array.push(<Entity key={value}  { ...attrs }></Entity>);
        })

        return array;
    };
}

export default DynamicElements;
