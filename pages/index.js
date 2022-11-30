import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb"
import Head from 'next/head'
import { Fragment } from 'react'


function HomePage(props){
    return (
    <Fragment>
        <Head>
        <title>Coding Meetups</title>
        <meta name="description" content="Lots of highly active React meetups"/>
        </Head>
        <MeetupList meetups={props.meetups}/>
        </Fragment>
        )
}

export async function getStaticProps(){

    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()
    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => (
                {
                    id: meetup._id.toString(),
                    title: meetup.data.title,
                    address: meetup.data.address,
                    image: meetup.data.image,  
                }
            ))
        },
        revalidate: 1
    }
}

export default HomePage