import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";


function Feed(props) {

    const authLocal = useAuth()
    const user = JSON.parse(localStorage.getItem("user"));
 

    const { _id, firstName, lastName, email, dateofBirth, location, occupation } = user;


    useEffect(() => {
        fetchFriendReq();
        fetchFriends();
        fetchPosts();
        if (user) {
            authLocal.login(user)
        }
    }, [])




    const [postImage, setImage] = useState()
    const [description, setDesc] = useState()
    const postData = new FormData();

    postData.append("userId", _id);
    postData.append("firstName", firstName);
    postData.append("lastName", lastName);
    postData.append("location", location);
    postData.append("description", description);
    postData.append("postImage", postImage);


    const addPost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/post", postData)
            const user = res.data;
            authLocal.login(user)
            alert("Post Added successfully");
            fetchPosts()


        } catch (error) {
            console.log(error)
            alert(error.message)
        };
    }


    const [postsData, setPostsData] = useState([])
    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:4000/post");
            setPostsData(res.data);

        } catch (error) {
            console.log("ERROR", error);
            // setErrors(error.response.data);
        }
    };

    const [friendrequest, setFriendRequest] = useState([])
    // console.log(friendrequest)
    const fetchFriendReq = async () => {
        // try {
        //     const res = await axios.get(`http://localhost:4000/friendrequest/${_id}`);
        //     console.log(res);

        // } catch (error) {
        //     console.log("ERROR", error);
        //     // setErrors(error.response.data);
        // }

        axios.get(`http://localhost:4000/friendrequest/${_id}`)
            .then(response => {
                // handle success
                setFriendRequest(response.data);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    };


    const [friends, setFriends] = useState([])
    const fetchFriends = async () => {

        
        axios.get(`http://localhost:4000/friendrequest/friends/${_id}`)
        .then(response => {
        
            setFriends(response.data); 
        })
        .catch(error => {
          console.log(error); // print the error
        });
      
    };


    const sendFriendReq = async (friendId) => {


        try {
            axios.post('http://localhost:4000/friendrequest', {
                requester: _id,
                recipient: friendId,
                status: 0
            })
                .then(response => {
                    if (response.data.message) {
                        alert(response.data.message);
                      } else {
                        console.log(response.data.data);
                        alert("Friend Request Send")
                      }
                    
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                });
            // const res = await axios.post(`http://localhost:4000/friendrequest/${_id}/${friendId}`)
            // const status = res.data;

            // alert(status)


        } catch (error) {
            console.log(error)
            alert(error.message)
        };
    }


    const confirmReq = async (id) => {
        axios.patch(`http://localhost:4000/friendrequest/${id}`, {
            status: 1
        })
            .then(response => {
                // handle success
                console.log(response.data);
                fetchFriendReq(_id)
                fetchFriends();
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    const delReq = async (id) => {
        axios.delete(`http://localhost:4000/friendrequest/${id}`)
        .then(response => {
          // handle success
          console.log(response.data);
          fetchFriendReq()
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-12 col-md-6 col-xl-3">
                        <div className="text-center bg-light-subtle shadow p-3 py-4">
                            <img src={require("../uploads/" + user.image)} className="rounded-circle" width="150" alt="" />
                            <h2 className="fw-normal mb-0">{`${user.firstName} ${user.lastName}`}</h2>
                            <h4 className="mb-3 text-muted" >{user.occupation}</h4>
                            <p><a className="btn btn-secondary" >View details »</a></p>
                        </div>
                        <div>
                            <div className="card">
                                <div className="card-header">
                                    Friends
                                </div>
                                <div className="card-body">
                                    {
                                        
                                        
                                            friends.map((data) => (

                                                <div className="card mb-3" key={data._id}>
    
                                                    <div className="p-2">
                                                        <div className="d-flex justify-content-start">
                                                            <div className="d-flex align-items-center">
                                                                <img src={require("../uploads/" + data.image)} className="rounded-circle" width="45" alt="" />
                                                                <div>
                                                                    <h5 className="mb-0 mx-2" >{`${data.firstName} ${data.lastName}`}</h5>
                                                                    <span className="mb-0 mx-2" >{`${data.location}`}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        
                                       
                                       
                                    
                                   
                                    }
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="col-12 col-md-6 col-xl-6">
                        <div>
                            <div className="card">
                                <div className="card-header d-flex align-items-center ">
                                    <img src={require("../uploads/" + user.image)} className="rounded-circle" width="45" alt="" />
                                    <h5 className="mb-0 mx-2" >{`${user.firstName} ${user.lastName}`}</h5>
                                </div>
                                <div className="card-body">
                                    <form method="post" encType="multipart/form-data">
                                        <div className="form-floating mb-3">
                                            <textarea className="form-control" placeholder="Leave a comment here" name="description" value={description} onChange={(e) => setDesc(e.target.value)} id="floatingTextarea2" style={{ height: "80px" }}></textarea>
                                            <label htmlFor="floatingTextarea2">Description</label>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Add Image</label>
                                            <input className="form-control" type="file" id="formFile" name="postImage" placeholder="upload Image" onChange={(e) => setImage(e.target.files[0])} />
                                        </div>

                                        <a onClick={addPost} className="btn btn-primary">Share</a>
                                    </form>
                                </div>
                            </div>

                            {
                                postsData.map((post) => (



                                    <div className="card my-3" key={post._id} >

                                        <div className="card-header d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <img src={require("../uploads/" + post.userImage)} className="rounded-circle" width="45" alt="" />
                                                <div>
                                                    <h5 className="mb-0 mx-2" >{`${post.firstName} ${post.lastName}`}</h5>
                                                    <span className="mb-0 mx-2" >{`${post.location}`}</span>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => sendFriendReq(post.userId)}>Add Friend</button>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{post.description}</p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                        <img src={require("../uploads/" + post.image)} className="card-img-bottom" />
                                    </div>


                                ))
                            }
                        </div>
                    </div>

                    <div className="col-12 col-xl-3">
                        <div>
                            <div className="card">
                                <div className="card-header">
                                    Friend requests
                                </div>
                                <div className="card-body">
                                    {
                                        friendrequest.map((data) => (
                                            
                                            <div className="card mb-3" key={data.request._id}>

                                                <div className="p-2">
                                                    <div className="d-flex justify-content-center">
                                                        <div className="d-flex align-items-center">
                                                            <img src={require("../uploads/" + data.requester.image)} className="rounded-circle" width="45" alt="" />
                                                            <div>
                                                                <h5 className="mb-0 mx-2" >{`${data.requester.firstName} ${data.requester.lastName}`}</h5>
                                                                <span className="mb-0 mx-2" >{`${data.requester.location}`}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="card-body">

                                                            <button type="button" className="btn btn-primary btn-sm ms-5" onClick={() => confirmReq(data.request._id)} >Confirm</button>
                                                            <button type="button" className="btn btn-outline-danger btn-sm ms-2"  onClick={()=> delReq(data.request._id)} >Delete</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Feed;