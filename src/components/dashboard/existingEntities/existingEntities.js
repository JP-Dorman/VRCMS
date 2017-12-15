import React from 'react';
import './existingEntities.css'


class ExistingEntities extends React.Component {

    render() {
        const insertName = this.props[0]["name"];
        const insertShape = this.props[1]["geometry"].match(/[\w]+(?=;)/);
        const insertColour = this.props[2]["material"].match(/\w+$/);
        const insertPositionXYZ = this.props[3]["position"].split(" ");
        const insertPositionX = insertPositionXYZ[0];
        const insertPositionY = insertPositionXYZ[1];
        const insertPositionZ = insertPositionXYZ[2];
        const insertScaleXYZ = this.props[4]["scale"].split(" ");
        const insertScaleX = insertScaleXYZ[0];
        const insertScaleY = insertScaleXYZ[1];
        const insertScaleZ = insertScaleXYZ[2];
        const buttonId = "button-" + this.props.buttonNumber;


        return (
            <div className="entity">
                <button className="entity-button" id={buttonId} onClick={this.props.toggleModal.bind(this, this.props[0]["name"], ["delete"], [])} ></button>
                <div className="name"><span>{insertName}</span></div>
                <div className="shape"><span>{insertShape}</span></div>
                <div className="colour"><span style={{background: "#" + insertColour}}></span></div>
                <div className="position-x"><span>{insertPositionX}</span></div>
                <div className="position-y"><span>{insertPositionY}</span></div>
                <div className="position-z"><span>{insertPositionZ}</span></div>
                <div className="scale-x"><span>{insertScaleX}</span></div>
                <div className="scale-y"><span>{insertScaleY}</span></div>
                <div className="scale-z"><span>{insertScaleZ}</span></div>
            </div>
        );
    };
}

export default ExistingEntities;
