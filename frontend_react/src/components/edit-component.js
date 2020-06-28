import React, {Component} from 'react';
import '../css/create.css';
import axios from 'axios';
import { dbConnection } from '../App';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Update extends Component{  

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',

            //validation
            firstNameError: '',
            middleNameError: '',
            lastNameError: ''
        }
    }

    componentDidMount(){
        axios.get(dbConnection+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    firstName : response.data.firstName,
                    middleName : response.data.middleName,
                    lastName : response.data.lastName
                })
                
            })
            .catch((err)=>{
                console.log(err);
            })

    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }

    validate=()=>{
        //validation
        let firstNameError= '';
        let middleNameError= '';
        let lastNameError= '';

        if(this.state.firstName.length === 0){
            firstNameError = "*Field is empty.";
        }else if(this.state.firstName.length < 4){
            firstNameError = "*Minimum of 4 characters required.";
        }

        if(!this.state.middleName){
            middleNameError = "*Field is empty.";
        }

        if(this.state.lastName.length === 0){
            lastNameError = "*Field is empty.";
        }else if(this.state.lastName.length < 4){
            lastNameError = "*Minimum of 4 characters required.";
        }

        if(firstNameError || middleNameError || lastNameError){
            this.setState({firstNameError, middleNameError, lastNameError});
            return false;
        }
        return true;
    }

    submitHandler=(e)=>{
        e.preventDefault();

        const isValid = this.validate();

        if(isValid){
            // backend connection
            axios.put(dbConnection+'update/'+this.props.match.params.id, this.state)
            .then(res => {

                console.log('profile updated successfully');

                let fullName = this.state.firstName+' '+this.state.middleName+' '+this.state.lastName;
                toast.success(fullName+' successfully updated!',{
                    position: "top-center",
                    transition:Bounce,
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });

                this.setState({
                    // firstName: '',
                    // middleName: '',
                    // lastName: '',

                    // validation
                    firstNameError: '',
                    middleNameError: '',
                    lastNameError: ''
                })
            });   

            // window.setTimeout(() => {
            //     this.props.history.push('/list'); 
            // }, 2000)
        }
    }
     
    render(){
        const{firstName, middleName, lastName} = this.state
        return(
                <div className="content">

                    <ToastContainer />

                    <h3>Update Profile</h3>
                    <form className="form-create" onSubmit={this.submitHandler}>
                        <table className="form-create">
                            <tbody>
                                <tr>
                                    <td><label>First Name:</label></td>
                                    <td><input type="text" name="firstName" value={firstName} 
                                        onChange={this.changeHandler}/></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className="errorMsg">{this.state.firstNameError}</td>
                                </tr>
                                <tr>
                                    <td><label>Middle Name:</label></td>
                                    <td><input type="text" name="middleName" value={middleName} 
                                        onChange={this.changeHandler}/></td>  
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className="errorMsg">{this.state.middleNameError}</td>
                                </tr>
                                <tr>
                                    <td><label>Last Name:</label></td>
                                    <td><input type="text" name="lastName" value={lastName} 
                                        onChange={this.changeHandler}/></td>   
                                </tr>
                                <tr>
                                <td></td>
                                    <td className="errorMsg">{this.state.lastNameError}</td>
                                </tr>

                                <tr>
                                    <td><input type="submit" value="Update"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

        )
    }
}