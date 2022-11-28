import MeetupDetail from "../../components/meetups/MeetupDetail"

import { Fragment } from 'react'
import Head from 'next/head'

import { MongoClient, ObjectId} from 'mongodb'


function MeetupDetails(props){
    return ( <Fragment>
        <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
        </Head>
            <MeetupDetail 
            title={props.meetupData.title}
            image={props.meetupData.image}
            address={props.meetupData.address}
            description={props.meetupData.description}
            />
    </Fragment>)
}



export async function getStaticPaths(){

    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray()

    client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            },
        })),
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId

    const client = await MongoClient.connect("mongodb+srv://diemalediven:gfhjkm1011@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

    
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.data.title,
                address: selectedMeetup.data.address,
                image: selectedMeetup.data.image,
                description: selectedMeetup.data.description,
            },
        },
    }
}

export default MeetupDetails