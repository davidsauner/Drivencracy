 import { ObjectId } from "mongodb"
import { choiceColection, pollColection,voteColection} from "../data/db.js"
 export async function postChoice(req,res){
    console.log(req.body)
    const {title,pollId} = req.body
    

    try{
        const poll = await pollColection.find({_id: ObjectId(pollId)}).toArray()
        console.log(poll)
        if (!poll.length) return res.sendStatus(404)
        await choiceColection.insertOne({title,pollId})

        res.sendStatus(201)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

 }
 

 export async function postVote(req,res){
    
    try{
        const {id} = req.params
        console.log(id)
        

        const choices = await choiceColection.find({_id:ObjectId(id)}).toArray()
        if(!choices.length) return res.sendStatus(400)

        // const poll = await pollColection.findOne({_id:choices[0].pollId})
        // if(!poll.length) return res.sendStatus(404)
            const today = Date.now()

        // if(poll.expireAt < today) return res.sendStatus(403)

        await voteColection.insertOne(
            {
                
                createdAt: today, 
                choiceId: id,

            }
        )
        

        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)}
}