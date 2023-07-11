import React, {useState} from 'react'
import ProgressBar from './ProgressBar'
import Modal from './Modal'


const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false)

const deleteItem = async(e) => {
  e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'DELETE',
      })
      if (response.status === 200) {
        getData()
      }
    } catch(err) {
      console.error(err)
    }
}

  return (
    <>
    <div className='w-full h-fit flex justify-between items-center p-4 rounded-md bg-slate-100 shadow-md shadow-slate-300 my-3'>
      <div className='flex'>
        <p>✅</p>
        <p className='text-md font-semibold ml-2'>{task.title}</p>
        <ProgressBar />
      </div>

      <div className='flex'>
        <button onClick={() => setShowModal(true)} className='text-sm font-medium mx-1 px-2 py-1 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'>Edit</button>
        <button onClick={deleteItem} className='text-sm font-medium mx-1 px-2 py-1 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>Delete</button>
      </div>
    </div>
    {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </>
  )
}

export default ListItem