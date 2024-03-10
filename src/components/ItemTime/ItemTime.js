import { Menu } from '../Menu/Menu';
import { Timer } from '../Timer/Timer';
import './ItemTime.css'

function ItemTime(props){    
    return(
      <div className={`taskTime ${props.todo.priority} ${(props.todo.isCompleted === true)? 'completed': ''}`}>
        <div className="informationContainer">
          <div>
          <p className='title'>{props.todo.text}</p>
          <p className='description'>{props.todo.description}</p>
          </div>          
        </div>
        <Timer todo={props.todo}/>
        <Menu reset={props.reset} delete={props.delete} complete={props.complete} edit={props.edit} openModal={props.openModal} type="time" setPreloadInfo={props.setPreloadInfo}/>
      </div>
    )
  }
  export {ItemTime};