import React, {useState} from 'react';
import axios from 'axios';

export default function CreateDiaryEntry(){
  const [description, setDescription] = useState("")
  

  function onChangedescription(e) {
    setDescription(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault();

    const diaryEntry = {
      description: description
    }

    console.log(diaryEntry);

    axios.post('http://localhost:5000/diaryEntrys/add', diaryEntry)
      .then(res => console.log(res.data));

    setDescription("")
  }

 
  return (
    <div>
      <h3>Create New Diary Entry</h3>
      <form onSubmit={onSubmit}>

        <div className="form-group"> 
          <label>What have you been doing?: </label>

          <input  type="text"
              required
              className="form-control"
              value={description}
              onChange={onChangedescription}
              />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Create Diary Entry" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )

}