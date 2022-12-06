import { useState } from 'react'
import './App.css'

interface Clicked {
  clientX: number
  clientY: number
}

function App() {
  const [clicked,setClicked] = useState<Clicked[]>([])
  const [undo, setUndo] = useState<Clicked[]>([])
  const [line, setLine] = useState<number>(0)
  const [col, setcol] = useState<number>(0)
  // the followint setInterval is causing problems.
  // probably, it should be called only once, but it is called every time the component is rendered
  const myTimer = setInterval(() => {
    setLine(()=>line + 1)
    setcol(()=>col + 1)
  },5000)

  const handleClick = ({clientX, clientY}:React.MouseEvent<HTMLDivElement>) => {
    setClicked([...clicked, {clientX, clientY}])
  }

  const handleUndo = () => {
    const poped = clicked.pop()
    setClicked([...clicked])
    if (!poped) return
    setUndo( [...undo, poped])
  }
  const handleRedo = () => {
    const poped = undo.pop()
    if (!poped) return
    setClicked([...clicked, poped])
    setUndo([...undo])
  }
  return (<>
      <button disabled={ clicked.length ===0} onClick={handleUndo} className="undo">Undo</button>
      <button disabled={ undo.length ===0} onClick={handleRedo} className="undo">Redo</button>
      <div className="bolinha" style={{top: line, left: col}}></div>
      <div className="App" onClick={handleClick}>
      {clicked.map((click:Clicked, index:number) => (
        <div key={index} className="click" style={{top: click.clientY, left: click.clientX}}>
        </div>
      ))}
      </div>
      </>
  )
}

export default App
