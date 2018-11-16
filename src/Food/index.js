import React from 'react';
import { Card, Segment, Button} from 'semantic-ui-react';

const ShowFood = (props) => {
  const foodList = props.allFood.map((food) => {
    return(
      <Card key={food.id} > 
        <Segment>
          <Card.Content>
            <Card.Header style={{fontSize: '20px', margin: '0px 0px 5px 0px'}}>
              {food.title}
            </Card.Header>
            <Card.Meta> Brought By:</Card.Meta>
            <Card.Description style={{fontSize: '15px', textShadow: '1px 1px grey', letterSpacing: '1.5px'}}>
              {food.user}
            </Card.Description>
          </Card.Content>
        </Segment>     
        <Button inverted color='red' onClick={props.deleteFood.bind(null, food.id)}> 
          Remove Food
        </Button>
      </Card>
    )
  });
  return(
    <Card.Group style={{ width: '200px' }} color='violet'>
      {foodList}
    </Card.Group>
  )
}
export default ShowFood;