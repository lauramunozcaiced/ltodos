import React from "react";
import { Context } from "../../Context/Context";

function Timer(props){
    const [play, setPlay] = React.useState(false);
    const [time, setTime] = React.useState(props.todo.achieved);

    const {
        todos,
        setTodos,
        updateLocalStorage,
        addPadding,
        completeTask
    } = React.useContext(Context);

    React.useEffect(()=> {
        setTime(props.todo.achieved);
    }, [props.todo.achieved])

    React.useEffect(()=>{
        if(play == true){
            const newTodos = [...todos];
            const index = newTodos.findIndex(todo => todo.id === props.todo.id);
            
            const achievedSplit = newTodos[index].achieved.split(':');
            const goalSplit = newTodos[index].goal.split(':');
    
            const hourAchievedConvert = parseInt(achievedSplit[0])*3600;
            const minutesAchievedConvert = parseInt(achievedSplit[1])*60;
            let secondsAchievedTotal = hourAchievedConvert + minutesAchievedConvert + parseInt(achievedSplit[2])+1;

            const hourGoalConvert = parseInt(goalSplit[0])*3600;
            const minutesGoalConvert = parseInt(goalSplit[1])*60;
            let secondsGoalTotal =  hourGoalConvert + minutesGoalConvert + parseInt(goalSplit[2]);
            
            const initdate = new Date();
            const endDate = new Date(initdate.getTime() + secondsAchievedTotal*1000);
            
    
            newTodos[index].endDate = endDate.toISOString();
            newTodos[index].state = '';
                  
        let timer = setInterval(() => {
                setTodos(prevTodos => {
                    const newTodos = [...prevTodos];
                    const insideIndex = newTodos.findIndex(todo => todo.id === props.todo.id);
                
                    const actualDate = new Date();
                    const diffSeconds = (endDate.getTime() - actualDate.getTime())/1000;
                   
                    const calculateHour = Math.trunc(diffSeconds / 3600)
                    const calculateMin = ((diffSeconds % 3600) >= 60) ? Math.trunc((diffSeconds % 3600)/60) : 0 ;
                    const calculateSec = (((diffSeconds % 3600) > 60))? Math.trunc((diffSeconds % 3600) - (calculateMin * 60))  : Math.trunc(diffSeconds);

                    const achieved = newTodos[insideIndex].achieved.split(':');
    
                    const hour = parseInt(achieved[0])*3600;
                    const minutes = parseInt(achieved[1])*60;
                    let secondsTotal = hour + minutes + parseInt(achieved[2]);

                    newTodos[insideIndex].achieved = `${addPadding(calculateHour)}:${addPadding(calculateMin)}:${addPadding(calculateSec)}`;
                    newTodos[insideIndex].percentage = (secondsGoalTotal - secondsTotal)*100/secondsGoalTotal;
                    updateLocalStorage(newTodos);

                    if(diffSeconds <= 1){
                        completeTask(props.todo.id);
                        newTodos[insideIndex].state = 'completed'
                    }
                    if(newTodos[insideIndex].state != ''){
                        setPlay(false)
                        clearInterval(timer);
                    }
                    
                    return newTodos;
                    
                    
                })
            }, 1000)
           
        }
        
    },[play])

 

    return (
        <>
        <div className="timeContainer">
          <div className='goalContainer'>
            <small className='goal'>GOAL: {props.todo.goal} </small>
            <span className="time">{(props.todo.isCompleted)? (<span className='completeText'>COMPLETED</span>) : time}</span>
          </div>
          
          <div className="barContainer">
            <button className={`ri-play-fill ${(props.todo.state === '')? 'hide': ''}`} onClick={(e)=>{
               setPlay(true);
                }}></button>
            
            <button className={`ri-pause-line ${(props.todo.state !== '')? 'hide': ''}`} onClick={(e)=>{
                props.todo.state = 'paused';
            }}></button>
            <div className="progress">
              <div style={{width:`${props.todo.percentage}%`}} className='bar'></div>
            </div>
          </div>
        </div>
        
        </>
    )
}

export {Timer}