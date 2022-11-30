import { Fragment } from "react"
import classes from './MeetupDetail.module.css'
import { useRouter } from 'next/router'

function MeetupDetail(props){

    const router = useRouter()
    
    async function removeEventHandler() {
        const response = await fetch('api/new-meetup', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.id)
      })
      
      router.push('/')
    }

    function editMeetupHandler(){
        router.push(`/${props.id}/editmeetup`)
      }


    return <section className={classes.detail}>
    <img src={props.image}
    alt={props.title}
    />
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.description}</p>
    <button className={classes.action} onClick={removeEventHandler}>Delete meetup</button>
    <button className={classes.action} onClick={editMeetupHandler}>Edit meetup</button>
</section>
}

export default MeetupDetail