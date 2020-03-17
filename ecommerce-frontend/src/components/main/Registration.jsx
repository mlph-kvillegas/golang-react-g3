import React from 'react'
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Form from 'components/reusable/Form'
import Input from 'components/reusable/Input'
import CustomButton from 'components/reusable/CustomButton'
import { Button, Container, Box, Select, MenuItem } from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import 'components/Components.css'
import UserService from 'services/UserService'
import Image from 'react-bootstrap/Image'
import Logo from '../../resources/images/logo.png'
import Alert from '@material-ui/lab/Alert'

class Registration extends React.Component {

    constructor () {
        super ()
        this.state = {
            firstname: '',
            lastname: '',
            email : '',
            username : '',
            password : '',
            address : '',
            type: '',
            error: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.saveRegistration = this.saveRegistration.bind(this)
    }

    handleInputChange (event) {
        const {name, value} = event.target
        this.setState({[name] : value})
    }

    handleConfirmPassword (event) {
        if (event.target.value !== this.state.password) {
            this.setState({"error": "Password does not match!"});
        } else {
            this.setState({"error": ''});

        }
    }

    async saveRegistration () {
        try {
            await UserService.register(this.state);
            this.setState({redirect: true})
        } catch (error) {
            console.log(error)
        }
        
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }

        const form = {
            formName : "login",
            formId : "login",
            method : "POST",
            // action : "http://localhost:4000/saveRegistration"
            onSubmit : this.saveRegistration
        }
        
        return (

            <div className="login">
                <Image src={Logo} fluid className="Login-logo" />
                <Container maxWidth="sm" className="Login-container">
                    <Form {...form}>
                        {/* <MuiThemeProvider> */}
                        <Box
                            boxShadow={0}
                            bgcolor="background.paper"
                            m={1}
                            p={1}
                        >
                            <div className="registration">
                                <br />
                                <Input name="firstname" type="text" placeholder="First Name" handleInputChange={this.handleInputChange} /><br /><br />
                                <Input name="lastname" type="text" placeholder="Last Name" handleInputChange={this.handleInputChange} /><br /><br />
                                <Input name="email" type="email" placeholder="Email" handleInputChange={this.handleInputChange} /><br /><br />
                                <Input name="username" type="text" placeholder="Username" handleInputChange={this.handleInputChange} /><br /><br />
                                <Input name="password" type="password" placeholder="Password" handleInputChange={this.handleInputChange} /><br /><br />
                                <Input name="confirmPassword" type="password" placeholder="Confirm Password" handleInputChange={this.handleConfirmPassword} /><br /><br />
                                <Input name="address" type="text" placeholder="Address" handleInputChange={this.handleInputChange} /><br /><br />

                               
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={this.state.type}
                                    name="type" variant="outlined" fullWidth
                                    placeholder="User Type"
                                    onChange={this.handleInputChange}
                                    
                                >
                                    <MenuItem value="SERVICE_PROVIDER">Service Provider</MenuItem>
                                    <MenuItem value="CUSTOMER">Customer</MenuItem>
                                </Select> <br /><br />


                                { this.state.error && 
                                    <span> <Alert severity="error" variant="filled"> { this.state.error }</Alert> <br /> <br/></span>
                                }

                                <CustomButton label="Sign Up" type="button" color="primary" doAction={this.saveRegistration} disabled={this.state.error} /><br /><br />
                                Already have an account? <Link to="/login"><Button size="small">Login</Button></Link>
                            </div>
                        </Box>
                        {/* </MuiThemeProvider> */}
                    </Form>
                </Container>
            </div>

        )

    }

}

export default Registration