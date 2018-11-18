import React, { Component } from 'react';
import { Header, Form, Segment, Container, Checkbox, Button, Divider, Icon, Image, Label, Modal} from 'semantic-ui-react';
import database, { auth, provider } from './firebase/firebase';

import ShowFood from './Food/index'
import './style.css'

class App extends Component {
  state = {
    username: '',
    food: '',
    guests: 0,
    allFood: [],
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user){
        this.setState({
          user 
        });
      }
    });  
    console.log(this.state.user, 'user')
    const allFoodRef = database.ref('allFood');
    allFoodRef.on('value', (snapshot) => {
      const foods = snapshot.val()
      // console.log(foods, 'foods');
      let newState = []
      for (let food in foods) {
        newState.push({
          id: food,
          title: foods[food].title,
          user: foods[food].user
        })
      }
      this.setState({
        allFood: newState
      });
    });
  }
  componentDidUpdate() {
   
  }
  handleFormUpdate = (e) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    }) 
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const item = {
      title: this.state.food,
      user: this.state.user.displayName || this.state.user.email
    }
    database.ref('allFood').push(item).then(()=> {
      //Change into semantic-ui modal//
      // alert('You added an item!');
      this.setState({
        username: '',
        food: '', 
        guests: 0
      })
    }).catch((error) => {
      console.log(error, 'this is an error ');
    })
    window.location.reload();
  }
  deleteFood = (Id) => {
    const allFoodRef = database.ref(`/allFood/${Id}`);
    allFoodRef.remove();
  }
 
  render() {
    return (
      <div id='App' style={{ border: '1px ridge cornflowerblue', padding: '25px', margin: '25px' }}>
        
        <Container>
          <Header as='h1' textAlign='left'>
            <Image src='https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F04%2FSushi-Transparent.png&f=1' avatar />
            Poppin' Potluck
             {this.state.user ?
              <Button color='red' onClick={this.logout} content='Log Out'></Button>
              :
              <Button color='red' onClick={this.login} content='Login' ></Button>
            }
          </Header> 
       
        </Container>
            
          {this.state.user ?
        <div>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>   
          <Segment  style={{width: '400px'}} raised >
              <Container >
                <Image src={this.state.user.photoURL} avatar/>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Input fluid icon='user' iconPosition='left' name='username' type='text' value={this.state.user.displayName || this.state.user.email} placeholder='What is your name?' onChange={this.handleFormUpdate} ></Form.Input>
                  <Form.Input fluid icon='food' iconPosition='left' name='food' type='text' value={this.state.food} placeholder='What food are you bringing?' onChange={this.handleFormUpdate} ></Form.Input>
                  <Form.Input fluid icon='users' iconPosition='left' name='guests' type='number' value={this.state.guests} placeholder='How many guests are you bringing?' onChange={this.handleFormUpdate} ></Form.Input>
                    <Modal trigger={<Button type='Submit' animated='fade' style={{ margin: '0px 0px 5px 0px' }} color='red'>
                      <Button.Content visible>Add Food Item</Button.Content>
                      <Button.Content hidden>Add Food Item</Button.Content>
                    </Button>}>
                      <Modal.Header>
                        You have added a food item!!
          </Modal.Header>
                    </Modal>
                  
                  <br />
                  <Checkbox label='Arriving on time?' defaultChecked />
                </Form>
              </Container>                          
          </Segment>        
        </Container>
        <Divider/>
        <ShowFood allFood={this.state.allFood} deleteFood={this.deleteFood} user={this.state.user}/>
        <Container style={{margin: '50px 0px 0px 0px'}}>
          <Divider horizontal >Copyright <Icon name='copyright outline'/> 2018 Avery-Dante Hinds</Divider>
        </Container>
        </div>
            :
            <Container style={{ display: 'flex', justifyContent: 'center' }} raised>
                <Label as='a' color='red' ribbon>Please Log In</Label>
                <p>You must be logged in to see the potluck list and submit to it.</p>
              </Container>                      
          }
      </div>
    );
  }
}

export default App;
