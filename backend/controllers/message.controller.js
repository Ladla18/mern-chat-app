import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  console.log("Message sent");
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    })
    if(newMessage){
        conversation.messages.push(newMessage._id)
    }

    //SOCKET IO Functionallity goes here

    await Promise.all([conversation.save(),newMessage.save()])

    res.status(200).json(newMessage)
  } catch (error) {
    console.error("message.controller.js", " :: Error ❌ : ", error);
  }
};

export const getMessages = async(req,res)=>{
console.log("GET MESSAGES CALLED")
    try {

        const {id} = req.params;
        console.log("id",id)
        
        const senderId = req.user._id;
        const  conversation = await Conversation.findOne({
            participants: { $all: [senderId, id] },
        }).populate('messages')
        if(!conversation){
            return res.status(404).json({message: "Conversation not found"})
        }
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.error("message.controller.js get message", " :: Error ❌ : ", error);
    }

}