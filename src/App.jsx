import './App.css'
import { useGetApiQuery } from './redux/apiSection'

function App() {
  const{data}=useGetApiQuery()

  console.log(data)
  return (
      <div className='app-componet'>
        <h3>{`Helo ${data?.data}`}</h3>
      </div>
  )
}

export default App
