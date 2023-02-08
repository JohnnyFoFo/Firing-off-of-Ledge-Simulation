import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import { wait } from '@testing-library/user-event/dist/utils';

import Grass from './components/Grass';
import { height } from '@mui/system';
import ball from './Images/cball.jpg'
import Modal from './components/Modal/Modal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


function App() {

  const [velocity,setVelocity] = useState([10,0]);
  const [initialheight,setInitialHeight] = useState([10]);
  
  let past_positions = [];
  const [modalData,setModalData] = useState(
    {
      'finalvelocityx': 0,
      'finalvelocityy': 0,
      'finaldistancex': 0,
      'finaldistancey': 0,
      'finaltime': 0,

    }
  );
  const [screen,setScreen] = useState('Main');
  const [currentPosition,setCurrentPosition] = useState(
    {"x": 0,
    "y": 100- initialheight -2
}); 
  const [inProgress,setInProcess] = useState('off');
  const [target, setTarget] = useState(0);

useEffect(() => {
 console.log(screen)
}, [screen])


async function timer(ms){
  return new Promise(resolve =>{
    setTimeout(()=>{
      resolve();
    }, ms)
  })
}

  async function shoot(){
    setInProcess('on');
    if (target != 0 ){
      setTarget(0);
    }
    const startTime  = Date.now();
//getPosition() != {"x": 0, "y":0}
    let count = 0;
    let initialxvelcotiy = velocity[0]
    let initialyvelocity = 0


    setVelocity([initialxvelcotiy, initialyvelocity])
    let bool = true;
    let finaltime = 0;
    while(bool){
      let current = Date.now();
     
      let time = -1*(startTime-current);
     

      setVelocity([velocity[0], velocity[1] - (9.8*time*.001)])

      let x = velocity[0] * time *  .001;
      let y =  initialheight - (9.8 * Math.pow(time*.001,2)*.5) 
     
      past_positions.push({
        'x':x,
        'y':y,
      })
  
      if (y <= 0){
        bool = false
        setTarget([x,y])
        setScreen('Modal');
        finaltime=time
      }
      
      setCurrentPosition({"x": x, "y": y}); 
      
      await timer(10);
      count ++;
    }
    {/*
      past_positions.map((element)=>{
        
        return(<div style={{position: 'absolute', left: `${element['x']}%`, top: `${element['y']}%`, backgroundColor:'red',height: '10%', width: '30%' }}></div>)
      })
      */
   }
     setInProcess('off');
     
     console.log(past_positions)
     setScreen('Modal')
     setModalData({
      'finalvelocityx': velocity[0],
      'finalvelocityy': velocity[1],
      'finaldistancex': currentPosition['x'],
      'finaldistancey': initialheight,
      'finaltime': finaltime/1000,
     })
     console.log(initialheight)
     console.log(currentPosition['x'])
  }


//{height: '10px !important',position: 'aboslute !important', left: `${currentPosition['x']/100}% !important`, top: `${currentPosition['y']/100}% !important`,  color: 'blue !important;'}
  return (
    <div className = 'App'>

<div className={screen == 'Main' ? 'default' : 'blurred'}>
      <div className='sliderBox'>

      <div className='sliders'>

      
        <div className='velocityBox'>
          <input type = "range" min = "2" max = "20"  className = "slider" id='velocityslider' onChange={e=> setVelocity([e.target.value,0])}></input>
          <h1>{`speed: ${velocity[0]} m/s`}</h1>
        </div>
      
        <div className='heightBox'>
          <input type = "range" min = "5" max = "60"  className = "slider" id='heightslider' onChange={e=> setInitialHeight(e.target.value,e.target.value)}></input>
          <h1>{`Starting Height: ${initialheight} m`}</h1>
        </div>
        </div>

        <div className='shootButton'>
          <PlayArrowIcon onClick={()=>shoot()} className='fireButton'/>
  
        </div>

      </div>
      
  
        <div >
          <img src={ball} style = {{height: '2%', position: 'absolute', left: inProgress == 'off' ?'5%' :`${5  + currentPosition['x']}%`, top: inProgress == 'off' ? `${(100-initialheight) -2}%` : `${100 - currentPosition['y'] }%`}}></img>
        </div>


        <div style={{width:'5%', height:`${initialheight}%`, backgroundColor: 'blue', position: 'absolute', left: '2%', top: `${100-initialheight}%`}}>
            
        </div>

      {target !=0 && <div style={{position: 'absolute', width: '5%', height: '1%', top: `${100}%`, left: `${target[0]}%`, backgroundColor: 'red', zIndex:2}}>

      </div>}

      { /*<div style={{position: 'absolute', width: '5%', height: '1%', top: `${100}%`, left: `${50}%`, backgroundColor: 'white', zIndex:1,  }}>

      </div>
  */}

        <Grass className = 'Grass'/>
        </div>
        {screen == 'Modal' && <Modal className='Modal' click={setScreen}
        
        finalXvelocity={modalData['finalvelocityx']}
        finalYvelocity={modalData['finalvelocityy']}
        finaldistanceX={modalData['finaldistancex']}
        finaldistanceY={modalData['finaldistancey']}
        time={modalData['finaltime']}
        /> }
      </div>
  )
}

export default App
