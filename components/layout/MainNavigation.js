import classes from './MainNavigation.module.css';
import {useSession, signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/router';

import Link from 'next/link'

function MainNavigation() {
  const {data:session} = useSession()
  
  const router = useRouter()

  function newMeetup(){
    if(!session){
      signIn()
    }
    else{
      router.push('/new-meetup')
    }
  }

  const logBtn = session?
  <button className={classes.headerBtn} onClick={() => signOut()}>Sign out</button>:
  <button className={classes.headerBtn} onClick={() => signIn()}>Sign in</button>

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Coding Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <button className={classes.addMeetup}onClick={() => newMeetup()}>Add New Meetup</button>
          </li>
          <li>
            {logBtn}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
