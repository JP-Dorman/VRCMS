import React from 'react';
import './modal.css'
import axios from 'axios';


class Modal extends React.Component {

/*
    handleDelete = (event) => {
        event.preventDefault();

        this.props.axiosGet;

        const buttonData = this.state.inputId
        const inputName = this.state.inputName;
        const inputShape = this.state.inputShape;
        const inputColour = this.state.inputColour;
        const inputPosition = this.state.inputPositionX +" "+ this.state.inputPositionY +" "+ this.state.inputPositionZ;
        const inputScale = this.state.inputScaleX +" "+ this.state.inputScaleY +" "+ this.state.inputScaleZ;
        const newEntity = [{"name": inputName}, {"geometry": inputShape}, {"material": inputColour}, {"position": inputPosition}, {"scale": inputScale}]
        const entityList = this.props.jsonData;

        if (inputName === "") {
            console.log("name cannot be empty");
            return false;
        }

        entityList.push(newEntity);

        const items = entityList;

        console.log("posted json:");
        console.log(items);
        this.postJson(items);
    }*/

    postJson = (items) => {
       axios.post('http://localhost:3001/postJson', {
           items
       })
       .then(function (response) {
           console.log("success!");
           console.log(response);
       })
       .catch(function (error) {
           console.log("error:");
           console.log(error);
       });
    }

    render() {
        const modalHeaderContent = this.props.modalData[0];
        const modalBodyContent = this.props.modalData[1];
        const showClass = this.props.modalShow === true ? "show" : ""


        console.log(this.props.modalData[1]);

        return (
            <div id="modalContainer" className={showClass}>
                <button id="modalShade" onClick={this.props.toggleModal.bind(this, "", [], "")}></button>
                <div id="modal">
                    <div id="modal-head">{modalHeaderContent}</div>
                    <div id="modal-body">
                    <ul>
                    {modalBodyContent.map((obj, index) => {
                        return (
                            <li key={index}><button onClick={this.handleLiClick}>{obj}</button></li>
                        );
                    })}
                    </ul>
                    </div>
                </div>
            </div>
        );
    };
}

export default Modal;
