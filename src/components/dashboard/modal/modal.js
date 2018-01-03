import React from 'react';
import './modal.css'


class Modal extends React.Component {


    handleDelete = (event) => {
        console.log("DELETE NOT IMPLEMENTED YET");
    }

    render() {
        const modalHeaderContent = this.props.modalData[0];
        const modalBodyContent = this.props.modalData[1];
        const showClass = this.props.modalShow === true ? "show" : "";

        return (
            <div id="modalContainer" className={showClass}>
                <button id="modalShade" onClick={this.props.toggleModal.bind(this, "", [], "")}></button>
                <div id="modal">
                    <div id="modal-head">{modalHeaderContent}</div>
                    <div id="modal-body">
                    <ul>
                    {modalBodyContent.map((obj, index) => {
                        return (
                            <li key={index}><button onClick={this.handleDelete}>{obj}</button></li>
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
