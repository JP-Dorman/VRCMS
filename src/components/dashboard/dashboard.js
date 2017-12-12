import React from 'react';
import './dashboard.css'
import RightDrawer from './rightDrawer/rightDrawer.js'
import ExistingEntities from './existingEntities/existingEntities.js'
import Modal from './modal/modal.js'
import axios from 'axios';

class DashboardPage extends React.Component {
    constructor() {
        super();
        this.state = {
            rightDrawerOpen: "closed",
            jsonData: [],
            modalData:["",[],""],
            modalShow: false
        };
    }

    /*========== Doc Ready ==========*/
    componentDidMount() {
        this.getJson();
    }

    /*========== Functions ==========*/
    getJson = () => {
        axios.get('scene-setup.json')
        .then(response => {
            console.log(response);
           this.setState({ jsonData: response.data["items"] })
        });
    }

    toggleRightDrawer = () => {
        if (this.state.rightDrawerOpen === "open") {
            this.setState({ rightDrawerOpen: "closed" });
        } else {
            this.setState({ rightDrawerOpen: "open" });
        }
    }

    toggleModal = (headerContent, bodyContent, clickedButtonId) => {
        this.setState ({
            modalShow: !this.state.modalShow,
            modalData: [headerContent, bodyContent, clickedButtonId]
        });
    }

    /*========== Page ==========*/
    render() {
        return (
            <div id="dashboard-page">
                <div id="header-bar">
                    <h1>Edit Scene</h1>
                </div>

                <div id="entities">
                    {this.state.jsonData.map((obj, index) => {
                        return (
                            <ExistingEntities
                            key={index}
                            {...obj}
                            buttonNumber={index}
                            toggleModal={this.toggleModal}
                            />
                        );
                    })}
                </div>

                <button id="fab" onClick={this.toggleRightDrawer}>
                  <i className="material-icons">add</i>
                </button>

                <RightDrawer open={this.state.rightDrawerOpen}
                    toggleRightDrawer={this.toggleRightDrawer}
                    axiosGet={this.getJson}
                    jsonData={this.state.jsonData}
                />

            <Modal
                modalShow={this.state.modalShow}
                modalData={this.state.modalData}
                toggleModal={this.toggleModal}
            />
            </div>
        );
    };
}

export default DashboardPage;
