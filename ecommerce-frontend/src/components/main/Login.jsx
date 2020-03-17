import React from 'react'
import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import Form from 'components/reusable/Form'
import Input from 'components/reusable/Input'
import CustomButton from 'components/reusable/CustomButton'
import { Button, Container, Box, Snackbar } from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import 'components/Components.css'
import Image from 'react-bootstrap/Image'
import Logo from '../../resources/images/logo.png'
import UserService from 'services/UserService'
import Alert from 'components/reusable/Alert'
import ls from 'local-storage'

class Login extends React.Component {
    
    constructor () {
        
        super ()
        this.state = {
            username : '',
            password : '',
            open: false,
            redirect: false,
            message : '',
            data : {}
        }
        this.login = this.login.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async login () {
        const { data } = await UserService.login(this.state);
        console.log(data);
        if (data.message !== 'success') {
            this.handleClick()
            this.setState({redirect: false, message: data.message})
        } else {
            ls.set('currentUser', data.result)
            this.setState({redirect: true, data: data.result})
        }
    }

    handleInputChange (event) {
        const {name, value} = event.target
        this.setState({[name] : value})
    }

    handleClick = () => {
        this.setState({open: true});
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    }

    getStyleClasses = makeStyles(theme => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
    }))

    render () {

        const classes = this.getStyleClasses

        if (this.state.redirect) {
            console.log(this.state);
            return this.state.data.Type === "CUSTOMER" ? <Redirect to='/mangjose/timeline'/> : <Redirect to='/mangjose/users'/>
        }
        
        return (

            <div className="login">
                <Image src={Logo} fluid className="Login-logo" />
                <Container maxWidth="sm" className="Login-container">
                    <Form>
                        <MuiThemeProvider>
                            <Box
                                boxShadow={0}
                                bgcolor="background.paper"
                                m={1}
                                p={1}
                            >
                                <br />
                                <Input name="username" id="username" type="text" placeholder="Username" handleInputChange={this.handleInputChange} />
                                <br />
                                <br />
                                <Input name="password" id="password" type="password" placeholder="Password" handleInputChange={this.handleInputChange} />
                                <br />
                                <br />
                                <CustomButton label="Login" type="button" color="primary" doAction={this.login}/>
                                <br />
                                <br />
                                Don't have an account yet?<Link to="/register"><Button size="small">Sign Up</Button></Link>
                                <div className={classes.root}>
                                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                        <Alert onClose={this.handleClose} severity="error">
                                            {this.state.message}
                                        </Alert>
                                    </Snackbar>
                                </div>
                            </Box>
                        </MuiThemeProvider>
                    </Form>
                </Container>
            </div>

        )

    }

}

export default Login