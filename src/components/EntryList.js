import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EntryList(){
  const [goals, setGoals] = useState([])
  const [diaryEntrys, setDiaryEntrys] = useState([])
//   const [exercisesEG, setExercisesEG] = useState([
//     {username: "a",
//     description: "test1",
//     duration: "test1",
//     date: "12/12/12",
//     _id: "1111"}
//   ])
  

  useEffect(() => {
    axios.get('http://localhost:5000/goals/')
      .then(response => (setGoals(response.data)))
  },[goals])

  useEffect(() => {
    axios.get('http://localhost:5000/diaryEntrys/')
      .then(response => (setDiaryEntrys(response.data)))
  },[diaryEntrys])


  function deleteGoal(id){
    axios.delete('http://localhost:5000/goals/' + id)
      .then(response => { console.log(response.data)});

    setGoals([...goals, goals.filter(el => el._id !== id)])
  }


  function deleteDiaryEntry(id){
    axios.delete('http://localhost:5000/diaryEntrys/' + id)
      .then(response => { console.log(response.data)});

    setDiaryEntrys([...diaryEntrys, diaryEntrys.filter(el => el._id !== id)])
  }


  function GoalList() {
    return (goals.map(currentGoal => {

      const {title, description, milestones,  _id} = currentGoal
      return (
        <tr key={_id} >
          <td>{title}</td>
          <td>{description}</td>
          <td>{milestones}</td>
          <td>
            <button type='submit' className='btn' onClick={() => { deleteGoal(_id) }}>
            delete
            </button>
          </td> 
        </tr>
      )
    })
  )}

  function DiaryEnrtyList() {
    return (diaryEntrys.map(currentDiaryEntry => {

      const {description,  _id} = currentDiaryEntry
      return (
        <tr key={_id} >
          <td>{description}</td>
          <td>
            {/* <Link to={"/edit/"+_id}>edit</Link> | */}
            {/* <a href="#" onClick={() => { deleteGoal(_id) }}>delete</a>  */}
            <button type='submit' className='btn' onClick={() => { deleteDiaryEntry(_id) }}>
            delete
            </button>
          </td>
        </tr>
      )
    })
  )}
  
    return (
      <div class="row">
        <div class="col-md-7">
          <h3>Logged Goals</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Milestones</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <GoalList/>
            </tbody>
          </table>
        </div>

        <div class="col-md-5">
          <h3>Diary Entries</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Description</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              <DiaryEnrtyList/>
            </tbody>
          </table>
        </div>

      </div>
    )
 
}

