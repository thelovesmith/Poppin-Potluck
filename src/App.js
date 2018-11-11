import React, { Component } from 'react';
import { Header, Form, Segment, Container, Checkbox, Button, Divider, Icon, Image} from 'semantic-ui-react';
import database from './firebase/firebase';
import ShowFood from './Food/index'
import './style.css'

class App extends Component {
  state = {
    username: '',
    food: '',
    guests: 0,
    allFood: []
  }

  componentDidMount() {
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
  handleFormUpdate = (e) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    }) 
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const item = {
      title: this.state.food,
      user: this.state.username
    }
    database.ref('allFood').push(item).then(()=> {
      //Change into semantic-ui modal//
      alert('You added an item!');
      this.setState({
        username: '',
        food: '', 
        guests: 0
      })
    }).catch((error) => {
      console.log(error, 'this is an error ');
    })
  }
  deleteFood = (Id) => {
    const allFoodRef = database.ref(`/allFood/${Id}`);
    allFoodRef.remove();
  }
 
  render() {
    return (
      <div id='App' style={{ border: '1px ridge cornflowerblue', padding: '25px', margin: '25px' }}>
          <Header as='h1' textAlign='center'>
            <Image src='https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F04%2FSushi-Transparent.png&f=1' avatar />
            Poppin' Potluck
          </Header>        
        <Container style={{ display: 'flex', justifyContent: 'center' }}>        
          <Segment  style={{width: '400px'}}>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Input fluid icon='user' iconPosition='left' name='username' type='text' value={this.state.username} placeholder='What is you name?' onChange={this.handleFormUpdate} ></Form.Input>
              <Form.Input fluid icon='food' iconPosition='left' name='food' type='text' value={this.state.food} placeholder='What food are you bringing?' onChange={this.handleFormUpdate} ></Form.Input>
              <Form.Input fluid icon='users' iconPosition='left' name='guests' type='number' value={this.state.guests} placeholder='How many guests are you bringing?' onChange={this.handleFormUpdate} ></Form.Input>
              <Button type='Submit' animated='fade' style={{margin: '0px 0px 5px 0px'}}>
                  <Button.Content visible>Add Food Item</Button.Content>
                  <Button.Content hidden>Add Food Item</Button.Content>
              </Button>
              <br/>
              <Checkbox label='Arriving on time?' defaultChecked/>                             
            </Form>
          </Segment>        
        </Container>
        <Divider/>
        <ShowFood allFood={this.state.allFood} deleteFood={this.deleteFood}/>
        <Container style={{margin: '50px 0px 0px 0px'}}>
          <Divider horizontal >Copyright <Icon name='copyright outline'/> 2018 Avery-Dante Hinds</Divider>
        </Container>
      </div>
    );
  }
}

export default App;
