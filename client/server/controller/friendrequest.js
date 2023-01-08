const FriendRequest = require("../model/FriendRequestschema");
const Users = require("../model/UsersSchema");




// const send = async (req, res) => {

//     const { id, friendId } = req.params;
//     // const user = await Users.findById(id);
//     // const friend = await Users.findById(friendId);


//             try {

//                 const sendReq = new FriendRequest({
//                     requester:id,
//                     recipient:friendId,
//                     status:1
//                 });

//                 const reqSend= await sendReq.save();


//                 if (reqSend) {
//                     res.status(201).json(reqSend);
//                 }

//             } catch (error) {
//                 res.json({ message: error.message });
//             }




// }


// const status = async (req,res)=>{
//     const id = req.params;
//     try {
//         const allReq = await FriendRequest.find(id);
//         if(allReq){
//             console.log(allReq)
//         }

//         // const userId2 = await Post.find({},{userId:1, _id:0})
//         res.status(200).json(allReq);
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }





// get a list of all requests
const getAllReq = async (req, res) => {
    const requests = await FriendRequest.find();
    res.send(requests);
};

// create a new request
const newReq = async (req, res) => {
    

    const request = new FriendRequest({
        requester: req.body.requester,
        recipient: req.body.recipient,
        status: req.body.status
    });
    try {
        await request.save();
        res.json({
            data: request,
            message: null
          });
    } catch (err) {
        res.status(400).send(err);
    }

};

// get a specific request
const specificReq = async (req, res) => {
        // Find friend requests with status 0 sent to the specified user
        const requests = await FriendRequest.find({ recipient: req.params.id, status: 0 });
        // Get the IDs of the requesters of those requests
        const requesterIds = requests.map(request => request.requester);
        // Find the users with those IDs
        const requesters = await Users.find({ _id: { $in: requesterIds } });
        res.json(requesters);
};

const getAllFriends = async (req, res) => {
    // Find friend requests with status 1 where the requester or recipient is the specified user
    const requests = await FriendRequest.find({
      $or: [{ requester: req.params.id }, { recipient: req.params.id }],
      status: 1
    });
  
    // Get the IDs of the requesters and recipients of those requests
    const requesterIds = requests.map(request => request.requester);
    const recipientIds = requests.map(request => request.recipient);
    // Combine the arrays of IDs and remove any duplicates
    const friendIds = [...new Set(requesterIds.concat(recipientIds))];
    // Exclude the user with the ID specified in the request parameters from the list of IDs
    const filteredIds = friendIds.filter(id => id !== req.params.id);
    // Find the users with those IDs
    const friends = await Users.find({ _id: { $in: filteredIds } });
  
    res.json(friends);
  };
  
  

// update a request
const updtReq = async (req, res) => {
    // const request = await FriendRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const request = await FriendRequest.findOneAndUpdate({ requestor: req.params.id }, req.body, { new: true });
    res.send(request);
};

// delete a request
const delReq = async (req, res) => {
    const request = await FriendRequest.findOneAndRemove({requestor: req.params.id });
    res.send(request);
};




module.exports = { getAllReq, newReq, specificReq, updtReq, delReq, getAllFriends}