import classes from './MeetupDetail.module.css'
import { useRouter } from 'next/router'
import {useSession, signIn, signOut} from 'next-auth/react'


function MeetupDetail(props){

    const router = useRouter()

    const {data: session} = useSession()
    
    async function removeEventHandler() {

      if(session){
        const response = await fetch('api/new-meetup', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.id)
      })
      router.push('/')
    }
    else{
      signIn()
    }
    }

    function editMeetupHandler(){
        if(session){
          router.push(`/${props.id}/editmeetup`)
        }
        else{
          signIn()
        }
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