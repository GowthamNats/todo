import React, {useState, useEffect} from 'react'
import ListHeader from './Components/ListHeader'

const App = () => {

  return (
    <div className='bg-blue-100 h-screen w-screen flex flex-col items-center py-16 px-32'>
        <div className='w-full h-fit max-h-full p-4 rounded-md bg-slate-100 shadow-md shadow-slate-300'>
          <ListHeader listName={'😁 ToDo List'} />
        </div>
    </div>
  )
}

export default App