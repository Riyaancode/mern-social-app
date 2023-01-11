const Users = require('../model/UsersSchema');



const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const serachUser = async (req, res) => {
    try {
        const { q } = req.query;
        console.log(q)
        
        const user = await Users.find({  $text: { $search: `"${q}"`  } });
        console.log(user)
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => {
                Users.findById(id)
            })
        )

        const formattedFriends = friends.map(({ _id, firstName, lastName, email, password, dateofBirth }) => {
            return { _id, firstName, lastName, email, password, dateofBirth };
        })

        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await Users.findById(id);
        const friend = await Users.findById(friendId);

        // if (user.friends.includes(friendId)) {
        //     user.friends = user.friends.filter((id) => id !== friendId)
        //     friend.friends = friend.friends.filter((id) => id !== id)

        // } else {}
            user.friends.push(friendId);
            friend.friends.push(id)
        
        const usersave1 = await user.save();
        const usersave2 = await friend.save();

        // const friends = await Promise.all(
        //     user.friends.map((id) => {
        //         Users.findById(id)
        //     })
        // )

        // const formattedFriends = friends.map(({ _id, firstName, lastName, email, password, dateofBirth }) => {
        //     return { _id, firstName, lastName, email, password, dateofBirth };
        // })

        res.status(200).json(usersave1)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


module.exports = { getUser, getUserFriends, addRemoveFriend, serachUser }