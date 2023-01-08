import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom'


function List(props) {
const [books,setbooks] = useState([]);
const [booksImage,setBooksImage] = useState();
const [booksdata, setbooksdata] = useState({
  title:"",
  author: "",
  publisher: "",
  stocks: "",
  ratings: ""
});

const {title,author,publisher,stocks,ratings} = booksdata;


  useEffect( ()=>{
  
    fetchBooks();

  }, [])


  const fetchBooks = async () => {
    try {
      const res = await axios.get("/getbooksdata");
      setbooks(res.data);
     
    } catch (error) {
      console.log("BOOKS: ERROR", error);
      // setErrors(error.response.data);
    }
  };


  const deleteBook = async (id) => {
    const x = window.confirm("Are you sure?");
    console.log(x);
    if (!x) return null;
    try {
      const res = await axios.delete("books/" + id);

      fetchBooks();
      console.log("BOOKS:", res);
    } catch (error) {
      console.log("BOOKS: ERROR", error);
      alert(error.response.data);
    }
  };






const formData = new FormData();
// var bookStr = JSON.stringify(booksdata);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("stocks", stocks);
      formData.append("ratings", ratings);
      formData.append("booksImage", booksImage);

const updateBook = async (id) =>{
// e.preventDefault();
console.log(id)

// try {
//   const res = await axios.post("/book"+id, formData);
//   console.log(res)
//   alert("successful insert");
// } catch (error) {
//   alert(error.message)
//   console.log(error)
// }
}

let name,value;
  const handleInputs =(e)=>{

    name = e.target.name;
    value = e.target.value;
    
      setbooksdata({...booksdata,[name]:value})
    }


  return (
    <>



    <div className="container mt-5">
    
      <h1 className="text-center" >List</h1>
      <button>
      <NavLink className="nav-link" to='/addbooks' >
                  Add Books
                </NavLink>
                </button>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Rating</th>
            {/* <th>Available Books</th> */}
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {
            
          books.map((b) => (

            <>    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Book Info</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form  method="POST"  encType="multipart/form-data">
               <input placeholder="Title" name="title" type="text"  value={booksdata.title} onChange={handleInputs}  />
               <input placeholder="Author" name="author" type="text" value={booksdata.author} onChange={handleInputs} />
               <input placeholder="Publisher" name="publisher" type="text" value={booksdata.publisher} onChange={handleInputs} />
               <input placeholder="image" name="booksImage" type="file"   onChange={(e) => setBooksImage(e.target.files[0])} />
               <input placeholder="stocks"  name="stocks" type="number" value={booksdata.stocks} onChange={handleInputs} />
               <input placeholder="ratings" name="ratings" type="number" value={booksdata.ratings} onChange={handleInputs} />
              <button type="button" onClick={()=>updateBook(b._id)}>Submit</button>
              
               </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
            
            <tr key={b._id} className="align-baseline">
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.ratings}</td>
              {/* <td>{b.availableBooks}</td> */}
              <td>{b.stocks}</td>
              <td><img src={require("../uploads/"+b.image)} alt={b.title} width="100px" /></td>
              <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit
</button><button type="button" class="btn btn-danger" onClick={() => deleteBook(b._id)}>DELETE</button></td>
            </tr>
          </>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
}

export default List;
