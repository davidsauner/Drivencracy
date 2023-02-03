import { choiceColection, pollColection,voteColection } from "../data/db.js"

import { ObjectId } from "mongodb";
export async function pollPost(req,res){
    let {title,expireAt} = res.locals.poll

 
    try{
        const poll ={
            title,
            expireAt
        }

        if(!expireAt){
            const today = new Date()
            const newExpire = new Date(today.getTime()+30*24*60*1000)
            poll.expireAt = newExpire
        }



        await pollColection.insertOne(poll)




        res.send(poll).status(201)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function pollGet(req,res){
    try{
        const polls = await pollColection.find().toArray()
        res.send(polls).status(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getChoices(req,res){
    
    try{
        const {id} = req.params
        

        const choices = await choiceColection.find({pollId:id}).toArray()
        if(!choices.length) return res.sendStatus(404)
        console.log(choices)
        res.status(200).send(choices)
    }catch(err){
        console.log(err)
        res.sendStatus(500)}
}
export async function getResult(req,res){
    try{
        const {id} = req.params
        console.log(id)

        const votes = await voteColection.aggregate([{$sortByCount: "$choiceId"}]).toArray()
    

        const choices = await choiceColection.find({pollId:id}).toArray()

        const choices2 = []
        choices.forEach(v => {
            choices2.push(v._id)
        });
        let choiceid
        for(let i=0; i<votes.length; i++){
            if(choices2.includes(votes[i]._id))
             choiceid = votes[i]._id
            break 
        }

        const pollresult = await pollColection.find({_id:new ObjectId(id)}).toArray()
        console.log(pollresult)
        if(!pollresult) return res.sendStatus(404)

        const votesresult = await voteColection.findOne({_id:choiceid})


        const result = {
        title: pollresult.title,
        expireAt: pollresult.expireAt,
        result : {
        title: choices.title,
        votes: votesresult.count
        }
    }
    
    console.log(result)

    res.send(result).status(200)
        

    }catch(err){
        console.log(err)
        res.sendStatus(500)}
}