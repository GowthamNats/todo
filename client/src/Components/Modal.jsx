import React, { useState } from 'react'

const Modal = ({mode, setShowModal, getData, task}) => {

  // const mode = 'create'
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "eldiosrey21@gmail.com",
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date()
  })
  

  const handleChange = (e) => {
    const {name, value} = e.target
    setData(data => ({
      ...data,
      [name] : value
    }))
  }

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.error(err)
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "PUT",
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-800/75 px-32 py-16'>
      <div className='w-2/3 h-2/3 flex flex-col justify-center items-center bg-slate-100 px-16 py-8 rounded-lg'>
        <div className='flex justify-between w-full font-semibold text-2xl'>
          <h1 className=''>Let us {mode} your task</h1>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form className='flex flex-col justify-center items-center w-full mt-10'>
          <input 
            className='px-4 py-2 rounded-md border-2 w-full mb-5'
            required
            maxLength={30}
            placeholder='Your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}
          />
          <label className='font-medium' htmlFor='range'>Drag to select your progress</label>
          <input 
            className='mt-2 mb-5 w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-slate-500/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:bottom-1'
            required
            id='range'
            type='range'
            min='0'
            max='100'
            name='progress'
            value={data.progress}
            onChange={handleChange}
          />
          <input onClick={editMode ? editData : postData} className='bg-green-500 text-white h-fit w-fit rounded-md px-4 py-2' type='submit' />
        </form>
      </div>
    </div>
  )
}

export default Modal