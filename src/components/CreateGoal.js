import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {produce} from "immer"

export default function CreateDiaryEntry(){
  const [goals, setGoals] = useState([])
  const [goal, setGoal] = useState({
    title: "test1",
    description: "test2",
    // date: new Date(),
    milestones: "testMileStone"
  })
  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGoal({ ...goal, [name]: value });
  };


  function handleSubmit(e) {
    e.preventDefault();
    console.log(goal);

    axios.post('http://localhost:5000/goals/add', goal)
      .then(res => console.log(res.data));

    // window.location = '/';
  }

    return (
    <div>
      <h3>Create New Goal</h3>
      <form>
        <div className="form-group"> 
          <label htmlFor='title'>Title: </label>
          <input
              type="text"
              id='title'
              name='title'
              required
              className="form-control"
              value={goal.title}
              onChange={handleChange}/>
        </div>

        <div className="form-group"> 
          <label htmlFor='description'>Description: </label>
          <input  
              type="text"
              id='description'
              name='description'
              required
              className="form-control"
              value={goal.description}
              onChange={handleChange}
              />
        </div>

        <div className="form-group">
          <label htmlFor='milestones'>Add a milestones </label>
          <input 
              type="text" 
              id='milestones'
              name='milestones'
              className="form-control"
              value={goal.milestones}
              onChange={handleChange}
              />
        </div>

        {/* <div className="form-group">
          <label>Completed by: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div> */}

          <button type='submit' className='btn' onClick={handleSubmit}>
            add person
          </button>
      </form>
    </div>
    )
}