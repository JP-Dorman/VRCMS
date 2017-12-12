import React from 'react';
import './rightDrawer.css'
import axios from 'axios';


class RightDrawer extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         inputName: "",
         inputShape: "primitive: box;",
         inputColour: "color: #F44336",
         inputPositionX: "0",
         inputPositionY: "1",
         inputPositionZ: "-2",
         inputScaleX: "1",
         inputScaleY: "1",
         inputScaleZ: "1"
       };

       this.handleInputChange = this.handleInputChange.bind(this);
     }

     handleInputChange = (event) => {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
         [name]: value
       });
     }

     handleSubmit = (event) => {
         event.preventDefault();

         this.props.axiosGet;

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
     }

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
        return (
            <div id="rightDrawerContainer" className={this.props.open}>
                <button className="shade" onClick={this.props.toggleRightDrawer}></button>
                <div id="rightDrawer">
                    <form onSubmit={this.handleSubmit}>

                        {/*=== Name ===*/}
                        <label>
                        <span>Name:</span>
                        <input name="inputName" type="text" value={this.state.inputName} onChange={this.handleInputChange} placeholder="Enter name.." />
                        </label>

                        {/*=== shape ===*/}
                        <label>
                            <span>Shape:</span>
                            <select name="inputShape" value={this.state.inputShape} onChange={this.handleInputChange}>
                                <option value="primitive: box;">Box</option>
                                <option value="primitive: sphere;">Sphere</option>
                                <option value="primitive: cylinder;">Cylinder</option>
                                <option value="primitive: plane;">Plane</option>
                            </select>
                        </label>

                        {/*=== Colour===*/}
                        <label>
                            <span>Colour:</span>
                            <select name="inputColour" value={this.state.inputColour} onChange={this.handleInputChange}>
                                <option value="color: #F44336">Red</option>
                                <option value="color: #FFEB3B">Yellow</option>
                                <option value="color: #E91E63">Pink</option>
                                <option value="color: #4CAF50">Green</option>
                                <option value="color: #FF9800">Orange</option>
                                <option value="color: #9C27B0">Purple</option>
                                <option value="color: #2196F3">Blue</option>
                                <option value="color: #212121">Black</option>
                                <option value="color: #FAFAFA">White</option>
                                <option value="color: #9E9E9E">Grey</option>
                            </select>
                        </label>

                        {/*=== Position X ===*/}
                        <label>
                            <span>Left / Right:</span>
                            <select name="inputPositionX" value={this.state.inputPositionX} onChange={this.handleInputChange}>
                                <option value="-5">-5</option>
                                <option value="-4">-4</option>
                                <option value="-3">-3</option>
                                <option value="-2">-2</option>
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>

                        {/*=== Position Y ===*/}
                        <label>
                            <span>Up / Down:</span>
                            <select name="inputPositionY" value={this.state.inputPositionY} onChange={this.handleInputChange}>
                                <option value="-5">-5</option>
                                <option value="-4">-4</option>
                                <option value="-3">-3</option>
                                <option value="-2">-2</option>
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>

                        {/*=== Position Z ===*/}
                        <label>
                            <span>Forward / Backward:</span>
                            <select name="inputPositionZ" value={this.state.inputPositionZ} onChange={this.handleInputChange}>
                                <option value="-5">-5</option>
                                <option value="-4">-4</option>
                                <option value="-3">-3</option>
                                <option value="-2">-2</option>
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>

                        {/*=== Scale X ===*/}
                        <label>
                            <span>Width:</span>
                            <select name="inputScaleX" value={this.state.inputScaleX} onChange={this.handleInputChange}>
                                <option value="-5">-5</option>
                                <option value="-4">-4</option>
                                <option value="-3">-3</option>
                                <option value="-2">-2</option>
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>

                        {/*=== Scale Y ===*/}
                        <label>
                            <span>Height:</span>
                            <select name="inputScaleY" value={this.state.inputScaleY} onChange={this.handleInputChange}>
                                <option value="-5">-5</option>
                                <option value="-4">-4</option>
                                <option value="-3">-3</option>
                                <option value="-2">-2</option>
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>

                        {/*=== Scale Z ===*/}
                        <label>
                            <span>Depth:</span>
                            <select name="inputScaleZ" value={this.state.inputScaleZ} onChange={this.handleInputChange}>
                                <option value="-5">-5</option>
                                <option value="-4">-4</option>
                                <option value="-3">-3</option>
                                <option value="-2">-2</option>
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>

                        {/*=== Submit ===*/}
                        <input className="btn" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    };
}

export default RightDrawer;
