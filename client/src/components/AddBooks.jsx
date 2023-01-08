import { useState } from "react";
import axios from 'axios';



function AddBooks(props) {
 
  const [booksImage,setBooksImage] = useState();
  const [booksdata, setbooksdata] = useState({
    title:"",
    author: "",
    publisher: "",
    stocks: "",
    ratings: ""
  });

  const {title,author,publisher,stocks,ratings} = booksdata



const formData = new FormData();
// var bookStr = JSON.stringify(booksdata);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("stocks", stocks);
      formData.append("ratings", ratings);
      formData.append("booksImage", booksImage);

const postData = async (e) =>{
e.preventDefault();


try {
  const res = await axios.post("/addbooksdata", formData);
  console.log(res)
  alert("successful insert");
} catch (error) {
  alert(error.message)
  console.log(error)
}




/*
const {title,author,publisher,stocks,ratings } = booksdata;

const res = await fetch("/addbooksdata", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify({
    title,author,publisher,stocks,ratings 
  })
});

const data = await res.json();

if(res.status === 422 || !data){
  window.alert("Invalid")
  console.log("Invalid")
}else{
  window.alert("Submitted Successfully")
  console.log("Submitted Successfully")
}*/

}

let name,value;

const handleInputs =(e)=>{

name = e.target.name;
value = e.target.value;

  setbooksdata({...booksdata,[name]:value})
}

// const handleFile =(e)=>{
//   console.log(e.target.files[0])
//   name = e.target.name;
// value = e.target.files;
// setbooksdata({[name]:value})
// }
 




  return (
    <>
    <div className="Input">
    <h1>Books</h1>
  <br/>


  <form  method="POST"  encType="multipart/form-data">
     <input placeholder="Title" name="title" type="text"  value={booksdata.title} onChange={handleInputs}  />
     <input placeholder="Author" name="author" type="text" value={booksdata.author} onChange={handleInputs} />
     <input placeholder="Publisher" name="publisher" type="text" value={booksdata.publisher} onChange={handleInputs} />
     <input placeholder="image" name="booksImage" type="file"   onChange={(e) => setBooksImage(e.target.files[0])} />
     <input placeholder="stocks"  name="stocks" type="number" value={booksdata.stocks} onChange={handleInputs} />
     <input placeholder="ratings" name="ratings" type="number" value={booksdata.ratings} onChange={handleInputs} />
    <button type="submit" onClick={postData}>Submit</button>
    
     </form>
         
        
    
    </div>
    </>
  )
}

export default AddBooks;
