import React from 'react'
import './Modal.css'
//import ReplayIcon from '@materialui/icons-material/Replay';
import ReplayIcon from '@mui/icons-material/Replay';

function Modal(props) {
  return (
    <div className='Modal'>
        <h1>
            Results:
        </h1>
        <ul>{`Final X-Velocity: ${props.finalXvelocity} m/s`}</ul>
        <ul>{`Final Y-Velocity: ${props.finalYvelocity} m/s`}</ul>
        <ul>{`Total Distance (X): ${props.finaldistanceX} meters`}</ul>
        <ul>{`Total Distance (Y): ${props.finaldistanceY} meters`}</ul>
        <ul>{`Time Taken: ${props.time} seconds`}</ul>


        <div className='REPLAY_DIV' onClick={()=> props.click('Main')}>
            <h3 className='replayHeader'>Replay</h3>
            <ReplayIcon className='Replay' />
        </div>
        

        
    </div>
  )
}

export default Modal