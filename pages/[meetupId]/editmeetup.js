import MeetupEdit from '../../components/meetups/MeetupEdit'

import { MongoClient, ObjectId } from 'mongodb'
import { useRouter } from 'next/router'

import { Fragment } from 'react'
import Head from 'next/head'

function editMeetup(props) {

    const router = useRouter()

    async function editMeetupData(editedData){
        const response = await fetch('/api/new-meetup', {
            method: 'PUT',
            body: JSON.stringify(editedData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        router.push('/')
    }
    return <Fragment>
         <Head>
            <title> Edit meetup</title>
            <meta name="description" content="Edit the meetup details"/>
        </Head>
        <MeetupEdit meetupData={props.meetupData} onEditMeetup={editMeetupData}/>
    </Fragment>
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

    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority`)
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

export default editMeetup
