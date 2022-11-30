import { MongoClient, ObjectId} from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST'){
        const data = req.body

        const user = process.env.DB_USER
        const password = process.env.DB_PASSWORD
        const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority`)
        
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne({data})

        client.close()

        res.status(201).json({message: 'Meetup inserted'})
    }
    if(req.method === 'DELETE') {
        const data = req.body

        const user = process.env.DB_USER
        const password = process.env.DB_PASSWORD
        const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority`)
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.deleteOne({"_id": ObjectId(data)})
        client.close()
        res.status(201).json({message: 'Meetup deleted'})
    }
    if (req.method === 'PUT'){
        const editedData = req.body
        const user = process.env.DB_USER
        const password = process.env.DB_PASSWORD
        const client = await MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0.mjgp455.mongodb.net/meetups?retryWrites=true&w=majority`)
        
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.replaceOne(
            {"_id": ObjectId(editedData.id)}, 
            {data: editedData}
            )
        client.close()

        res.status(200).json({message: 'Meetup edited'})
    }
}

export default handler