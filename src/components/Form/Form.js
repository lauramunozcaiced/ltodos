import React from "react";
import { Context } from "../../Context/Context";
import "./Form.css"

function Form() {
    const {
        setOpenModal,
        addTask,
        editTask,
        addPadding,
        preloadInfo,
    } = React.useContext(Context);

    const [name , setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [type, setType] = React.useState('time');
    const [priority , setPriority] = React.useState('high');
    const [sec, setSec ] = React.useState(0);
    const [min, setMin] = React.useState(0);
    const [hour, setHour] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const onSubmit = (event) => {
     event.preventDefault();
     if(preloadInfo != null){
        editTask(preloadInfo.id,{
            text: name,
            description: description,
            type: type,
            priority: priority,
            goal: (type === 'time')? `${addPadding(hour)}:${addPadding(min)}:${addPadding(sec)}`: count,
         })
     }else{
        addTask({
            text: name,
            description: description,
            type: type,
            priority: priority,
            goal: (type === 'time')? `${addPadding(hour)}:${addPadding(min)}:${addPadding(sec)}`: count,
         })
     }
     
     setOpenModal(false);
    }

    React.useEffect(()=>{
        if(preloadInfo != null)
        {
            setName(preloadInfo.text);
            setDescription(preloadInfo.description);
            setType(preloadInfo.type);
            setPriority(preloadInfo.priority);

          
            if(preloadInfo.type == 'time'){
                const time = preloadInfo.goal.split(':');
                setHour(parseInt(time[0]));
                setMin(parseInt(time[1]));
                setSec(parseInt(time[2]));
            }else{
                setCount(preloadInfo.goal)
            }
            
        }
    },[preloadInfo])

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <label>What is the name?</label><br />
                    <input type='text' onChange={(e)=> {setName(e.target.value)}} value={name} required/>
                </div>
                <div>
                    <label>What is the description?</label><br />
                    <textarea onChange={(e)=> {setDescription(e.target.value)}} value={description} />
                </div>
                <div>
                    <label>How would you like to calculate it?</label><br />
                    <select onChange={(e)=> {setType(e.target.value)}} value={type} required>
                        <option value="time">Time</option>
                        <option value="count">Count</option>
                    </select>
                </div>
                <div>
                    <label>What is your goal?</label><br />
                    {(type === 'time')?(
                        <div className="goalTimeField">
                            <div><input type="number" max="10" min="0" onChange={(e)=>setHour(e.target.value)} value={hour}/><label>hours</label></div>
                            <div><input type="number" max="59" min="0" onChange={(e)=>setMin(e.target.value)} value={min}/><label>minutes</label></div>
                            <div><input type="number" max="59" min="0" onChange={(e)=>setSec(e.target.value)} value={sec}/><label>seconds</label></div>
                        </div>
                    ) :(<div className="goalCountField"><input  type="number" onChange={(e)=>setCount(e.target.value)} value={count} required/><label>times</label></div>)}
                    
                </div>
                <div>
                    <label>What is the priority?</label><br />
                    <select onChange={(e)=>setPriority(e.target.value)} value={priority} required>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div>
                    <button type="submit" className="submit">Save</button>
                </div>
            </form>
        </>
    )
}

export { Form }