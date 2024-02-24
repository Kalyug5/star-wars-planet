import React from 'react'
import { useEffect,useState } from 'react'
import './App.css'
import Resident from './components/Resident'


const api=`https://swapi.dev/api/planets/?format=json`
const App = () => {
  const [planet,setPlanet]=useState([])
  const [nextUrl,setNextUrl]=useState(null)
  const [currentpage,setCurrentpage]=useState(1)


  useEffect(()=>{
    fetchResult(api)
  },[])

  

  const fetchResult= async (url)=>{

    const data=await fetch(url)
    const result= await data.json()
    console.log(result);
    setNextUrl(result.next)
    setPlanet(result.results)


  }

  const handleNext=()=>{
    if(nextUrl){
      setCurrentpage(currentpage+1)
      fetchResult(nextUrl)
    }

  }

  const handlePrev=()=>{
    if(currentpage>1){
      const prevUrl=`https://swapi.dev/api/planets/?page=${currentpage-1}&format=json`
      setCurrentpage(currentpage-1)
      fetchResult(prevUrl)
    }
  }

  const handleMidClick=(value)=>{

    fetchResult(`https://swapi.dev/api/planets/?page=${value}&format=json`)
    setCurrentpage(value)

  }

  return (
    <>
        <h1 className='star_war'>Welcome to Star Wars</h1>
        <div className='conatiner'>{
          planet.map((item,index)=>{
            return(
              <div key={index} className='card'>
                  <div className="card-header">Planet : {item.name}</div>
                  <div className='card-content'>
                  <div>Climate-> {item.climate}</div>
                  <div>Population-> {item.population}</div>
                  <div>Terrain-> {item.terrain}</div>
                  </div>
                  {item.residents.length > 0 && <div className="resident-header">Residents</div>}
                  <Resident resident={item.residents}/>
              </div>
            )
          })
        }
        </div>
        {
          planet.length>1 ? (
            <div>
            <div className='pagination'>
              {currentpage>1 && <button className='btn' onClick={handlePrev} >⬅️</button>}
              
              <span className={currentpage===1 ? "selected_page":""} onClick={()=>handleMidClick(1)}>1</span>
              <span className={currentpage===2 ? "selected_page":""} onClick={()=>handleMidClick(2)}>2</span>
              <span className={currentpage===3 ? "selected_page":""} onClick={()=>handleMidClick(3)}>3</span>
              <span className={currentpage===4 ? "selected_page":""} onClick={()=>handleMidClick(4)}>4</span>
              <span className={currentpage===5 ? "selected_page":""} onClick={()=>handleMidClick(5)}>5</span>
              <span className={currentpage===6 ? "selected_page":""} onClick={()=>handleMidClick(6)}>6</span>
              
              {nextUrl && <button className='btn' onClick={handleNext} >➡️</button>}
              </div>
            </div>
          ):
          (
            <div>{null}</div>
          )
        }
    </>
  )
}

export default App