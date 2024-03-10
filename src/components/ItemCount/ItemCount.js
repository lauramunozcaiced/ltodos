import { Menu } from '../Menu/Menu';
import './ItemCount.css'


function ItemCount(props){
  
    return(
      <div className={`taskCount ${(props.isCompleted === true)? 'completed': ''}`}>
        <div style={{width:`${props.percentage}%`}} className='taskCount_bar'></div>
        <Menu type="count" reset={props.reset} complete={props.complete} delete={props.delete} edit={props.edit} openModal={props.openModal} setPreloadInfo={props.setPreloadInfo}/>
        <div className="informationContainer">
          {(props.isCompleted === true)? 
          (<span className={`priority completed`}>completed</span>):
          (<span className={`priority ${props.priority}`}>{props.priority}</span>)}
          
          <p>{props.text}</p>
          <p className='description'>{(props.description !== '')&& props.description}</p>
        </div>
        <div className="goalContainer">
          {(props.isCompleted === true)? 
          (<></>):
          (<div className='goal'>
            <button className="manageGoal ri-subtract-line" onClick={props.extract}></button>
            <p><b>{props.achieved}</b> of {props.goal}</p>
            <button className="manageGoal ri-add-fill" onClick={props.insert}></button>
          </div>)}        
        </div>
      </div>
    )
  }
  export {ItemCount};