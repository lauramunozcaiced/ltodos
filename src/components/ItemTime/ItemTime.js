import { Menu } from '../Menu/Menu';
import './ItemTime.css'

function ItemTime(props){    
    return(
      <div className={`taskTime ${props.priority} ${(props.isCompleted === true)? 'completed': ''}`}>
        <div className="informationContainer">
          <div>
          <p>{props.text}</p>
          <span>{props.description}</span>
          </div>          
        </div>
        <div className="timeContainer">
          <div className='goalContainer'>
            <small className='goal'>GOAL: {props.goal}</small>
            <span className="time">{(props.isCompleted)? (<span className='completeText'>COMPLETED</span>) : props.achieved}</span>
          </div>
          
          <div className="barContainer">
            <button className={`ri-play-fill ${(props.state === '')? 'hide': ''}`} onClick={(e)=>{
                props.run();
                }}></button>
            
            <button className={`ri-pause-line ${(props.state !== '')? 'hide': ''}`} onClick={(e)=>{
              props.pause();
            }}></button>
            <div className="progress">
              <div style={{width:`${props.percentage}%`}} className='bar'></div>
            </div>
          </div>
        </div>
        <Menu reset={props.reset} delete={props.delete} complete={props.complete} edit={props.edit} openModal={props.openModal} type="time" setPreloadInfo={props.setPreloadInfo}/>
      </div>
    )
  }
  export {ItemTime};