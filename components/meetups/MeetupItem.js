import { useRouter } from 'next/router'

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {

  const router = useRouter()


function showDetailsHandler(){
  router.push('/' + props.id)
}

async function removeEvent() {
    const response = await fetch('api/new-meetup', {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props.id)
  })
  
  router.push('/')
}


  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          <button onClick={removeEvent}>Remove event</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
