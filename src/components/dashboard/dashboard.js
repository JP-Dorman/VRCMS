import React from 'react';
import './dashboard.css'
import './zIndex.css'
import LeftDrawer from './leftDrawer/leftDrawer.js'
import RightDrawer from './rightDrawer/rightDrawer.js'
import ExistingEntities from './existingEntities/existingEntities.js'
import Modal from './modal/modal.js'
import * as firebase from 'firebase';


class DashboardPage extends React.Component {
    /*==================== State ====================*/
    constructor() {
        super();
        this.state = {
            leftDrawerOpen: false,
            rightDrawerOpen: false,
            jsonData: [],
            modalData:["",[],""],
            modalShow: false,
            firebaseJsonData: [],
            latestEntityKey: 0,
        };
    }

    /*==================== Doc Ready ====================*/
    componentDidMount = () => {
        this.firebaseGetData();
    }

    componentDidUpdate = () => { /*...*/ }

    /*==================== Functions ====================*/
    firebaseGetData = () => {
        /*========== Firebase Application ==========*/
        const rootRef = firebase.database().ref().child('vrcms');
        const vrEntitiesRef = rootRef.child('vrEntities');

        vrEntitiesRef.on('value', snap => {
            this.setState({ firebaseJsonData: [] });

            snap.forEach(entity => {
                const key = entity.key;
                const latestEntityKey = this.state.latestEntityKey;
                const name = entity.child('meta').child('name').val();
                const userId = entity.child('meta').child('userId').val();
                const geometry = entity.child('props').child('geometry').val();
                const shapeText = geometry.match(/[\w]+(?=;)/);
                const material = entity.child('props').child('material').val();
                const colourText = material.match(/\w+$/);
                const positionXYZ = entity.child('props').child('position').val().split(" ");
                const positionX = positionXYZ[0];
                const positionY = positionXYZ[1];
                const positionZ = positionXYZ[2];
                const scaleXYZ = entity.child('props').child('scale').val().split(" ");
                const scaleX = scaleXYZ[0];
                const scaleY = scaleXYZ[1];
                const scaleZ = scaleXYZ[2];
                const pushEntity = {
                    "key": key,
                    "name": name,
                    "userId": userId,
                    "geometry": geometry,
                    "shapeText": shapeText,
                    "material": material,
                    "colourText": colourText,
                    "positionX": positionX,
                    "positionY": positionY,
                    "positionZ": positionZ,
                    "scaleX": scaleX,
                    "scaleY": scaleY,
                    "scaleZ": scaleZ,
                };

                this.setState(prevState => ({
                    firebaseJsonData: [...prevState.firebaseJsonData, pushEntity]
                }));

                // Set new entity id to one above current highest id
                if (key >= latestEntityKey) {
                    this.setState({ latestEntityKey: parseInt(key, 10) + 1 })
                }
            });
        });
    }

    toggleRightDrawer = () => {
        if (this.state.rightDrawerOpen === true) {
            this.setState({ rightDrawerOpen: false });
        } else {
            this.setState({ rightDrawerOpen: true });
        }
    }

    toggleLeftDrawer = () => {
        if (this.state.leftDrawerOpen === true) {
            this.setState({ leftDrawerOpen: false });
        } else {
            this.setState({ leftDrawerOpen: true });
        }
    }

    toggleModal = (headerContent, bodyContent, clickedButtonId) => {
        this.setState ({
            modalShow: !this.state.modalShow,
            modalData: [headerContent, bodyContent, clickedButtonId]
        });
    }

    /*==================== Page ====================*/
    render() {
        return (
            <div id="dashboard-page">
                <div id="header-bar">
                    <button onClick={this.toggleLeftDrawer}><i className="material-icons">menu</i></button>
                    <h1>Edit Scene</h1>
                </div>

                <div id="entities">
                    {this.state.firebaseJsonData.map((obj, index) => {
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

                <LeftDrawer open={this.state.leftDrawerOpen}
                    toggleLeftDrawer={this.toggleLeftDrawer}
                />

                <RightDrawer open={this.state.rightDrawerOpen}
                    toggleRightDrawer={this.toggleRightDrawer}
                    axiosGet={this.getJson}
                    jsonData={this.state.jsonData}
                    latestEntityKey={this.state.latestEntityKey}
                />

                <Modal
                    jsonData={this.state.jsonData}
                    modalShow={this.state.modalShow}
                    modalData={this.state.modalData}
                    toggleModal={this.toggleModal}
                />
            </div>
        );
    };
}

export default DashboardPage;
