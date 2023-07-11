import React, {useState, useEffect} from 'react'
import Modal from './Modal'
import ListItem from './ListItem'

const ListHeader = ({ listName }) => {

  const [tasks, setTasks] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const signOut = () => {
    console.log('signout')
  }

  const getData = async() => {
    const userEmail = 'eldiosrey21@gmail.com'
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      console.log(json)
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])
  console.log(tasks)

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))


  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex justify-between p-3 static'>
          <h1 className='text-3xl font-bold'>{listName}</h1>
          <div className='flex items-center'>
            <button onClick={() => setShowModal(true)} className='text-sm font-medium mx-1 px-2 py-1 rounded-full border-2 border-black'>Add New</button>
            {/* <button onClick={signOut} className='text-sm font-medium mx-1 px-2 py-1 rounded-full border-2 border-black'>Sign Out</button> */}
          </div>
      </div>
      <div className='w-full mt-5 p-2 overflow-y-auto'>
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  )
}

export default ListHeader