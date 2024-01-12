import { Header } from "./components/navigationHeader/Header"
import{Routes,Route} from "react-router-dom"
import { Controller } from "./pages/controller"
import "./styles/index.scss"
import { Hr } from "./pages/Hr"
import { Marketing } from "./pages/Marketing"
import { Service } from "./pages/Service"
import { Production } from "./pages/Production"

function App() {

  
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Controller />}/>
          <Route path="/HR" element={<Hr />}/>
          <Route path="/marketing" element={<Marketing />}/>
          <Route path="/service" element={<Service />}/>
          <Route path="/production" element={<Production />}/>
      </Routes>
    </>
  )
}
export default App

/* api fetching from the backend we used inbuild feture of redux toolkit that is 'RTK query' */