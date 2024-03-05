import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Context = React.createContext();

function Provider({ children }) {
    const ownerName = 'Laura';
    const [{ item: todos,
        setItem: setTodos,
        updateLocalStorage,
        loading,
        error
    }] = useLocalStorage('TODOS_V1', []);
    const [search, setSearch] = React.useState('');
    const [todoTimer, setTodoTimer] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [time, setTime] = React.useState('00:00:00');
    const [preloadInfo, setPreloadInfo] = React.useState(null);

    const completedTodos = todos.filter(todo => !!todo.isCompleted);
    const searchedTodos = todos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))

    const countTODOs = searchedTodos.filter(todo => todo.type === 'count')
    const timeTODOs = searchedTodos.filter(todo => todo.type === 'time')

    const completeAudio = new Audio('./completed.mp3');

    const runTimeTask = (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        console.log(newTodos[index].state);
        if (newTodos[index].state === 'paused') {
            newTodos[index].state = '';
        }else {
            console.log('entra acá');
            newTodos[index].state = '';
            setTodoTimer(newTodos[index].id);
        }
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }
    const pauseTimeTask = (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].state = 'paused';
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }

    const operateCount = (id, sum = false) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        const goal = parseInt(newTodos[index].goal)

        const validation = (sum) ? goal > parseInt(newTodos[index].achieved) && parseInt(newTodos[index].achieved) >= 0 : goal > parseInt(newTodos[index].achieved) && parseInt(newTodos[index].achieved) > 0;
        if (validation) {
            newTodos[index].achieved = (sum === true) ? (parseInt(newTodos[index].achieved) + 1).toString() : (parseInt(newTodos[index].achieved) - 1).toString();
            newTodos[index].percentage = (100 * parseInt(newTodos[index].achieved)) / goal;
            if (goal === parseInt(newTodos[index].achieved)) {
                completeTask(id);
            }
        }
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }

    const editTask = (id, data) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        
        newTodos[index].text = data.text;
        newTodos[index].description = data.description;
        newTodos[index].type = data.type
        newTodos[index].priority = data.priority;
        newTodos[index].goal = data.goal;
        newTodos[index].achieved = (data.type === 'time')? '00:00:00': 0;
        newTodos[index].state = 'init';
        newTodos[index].percentage = 0;
        newTodos[index].isCompleted = false;

        setPreloadInfo(null);
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }

    const completeTask = (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos[index].achieved = newTodos[index].goal;
        newTodos[index].isCompleted = true;
        newTodos[index].percentage = 100;
        newTodos[index].state="";

        setTodos(newTodos);
        updateLocalStorage(newTodos);
        completeAudio.play();
        console.log('Should play audio');
    }

    const resetTask = (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        if (newTodos[index].type === 'time') {
            pauseTimeTask(id);
        }
        newTodos[index].isCompleted = (newTodos[index].isCompleted === true) && false;
        newTodos[index].achieved = (newTodos[index].type === 'count') ? '0' : '00:00:00';
        newTodos[index].percentage = 0;
        newTodos[index].state = (newTodos[index].type === 'time') ? 'reset' : '';
        setTodoTimer(null);
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }

    const removeTask = (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
        newTodos.splice(index, 1);

        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }

    const addTask = (params) => {
        const newTodos = [...todos];
       newTodos.push({
            id: newTodos[newTodos.length - 1].id + 1, 
            ...params,
            achieved: (params.type === 'time')? '00:00:00' : '0', 
            state: (params.type === 'time')?'init':'' , 
            percentage: 0 ,
            isCompleted: false }
        )
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }

    const addPadding = (num) => {
        if (num === 0) {
            return `00`;
        } else if (num < 10) {
            return `0${num.toString()}`;
        } else {
            return `${num.toString()}`;
        }
    }


    React.useEffect(() => {
        if (todoTimer !== null) {
            let secondsRun = 0;
            let minutesRun = 0;
            let hoursRun = 0;
            let isMinute = false;
            let isHour = false;
            let resetSeconds = false;
            let resetMinutes = false;
            let setSecondsPass = true;  

            let secondsTotal = 0;
            let timer = setInterval(() => {
                setTodos(prevTodos => {
                    const newTodos = [...prevTodos];
                    const index = newTodos.findIndex(todo => todo.id === todoTimer);

                    const timeSepared = newTodos[index].goal.split(':');
                    const hours = parseInt(timeSepared[0]) * 3600;
                    const minutes = parseInt(timeSepared[1]) * 60;
                    const seconds = hours + minutes + parseInt(timeSepared[2]);
                    
                    const timePass = newTodos[index].achieved.split(':');
                    const hourPass = parseInt(timePass[0])*3600;
                    const minutesPass = parseInt(timePass[1])*60;
                    let secondsPass = hourPass + minutesPass + parseInt(timePass[2]);

                    if (newTodos[index].state !== 'paused' && newTodos[index].state !== 'reset') {
                       
                        if ((secondsTotal + secondsPass) < seconds) {
                            secondsTotal++;
                            secondsRun++;
                            console.log(secondsPass);
                            if(setSecondsPass){
                                if(secondsPass > 0){
                                    console.log('entra',secondsPass);
                                if(secondsPass < 60){
                                    console.log('entra a segundos',secondsRun);
                                    secondsRun = secondsRun + secondsPass;
                                }else{
                                    if(secondsPass < 3600){
                                        const calculateMin = Math.trunc(secondsPass / 60)
                                        const calculateSec = secondsPass % 60;
                                        minutesRun = minutesRun + calculateMin;
                                        secondsRun = secondsRun + calculateSec
                                    }else{
                                        const calculateHour = Math.trunc(secondsPass / 3600)
                                        const calculateMin = ((secondsPass % 3600) >= 60) ? Math.trunc((secondsPass % 3600)/60) : 0 ;
                                        const calculateSec = (((secondsPass % 3600) > 60))? (secondsPass % 3600) - (calculateMin * 60)  : 0;
                                        hoursRun = hoursRun + calculateHour;
                                        minutesRun = minutesRun + calculateMin;
                                        secondsRun = secondsRun + calculateSec
                                    }
                                }
                                }
                                setSecondsPass = false;
                            }

                            isMinute = (secondsTotal > 0 && secondsTotal % 60 === 0) ? true : false;
                            isHour = (secondsTotal > 0 && secondsTotal % 3600 === 0) ? true : false;
                            resetSeconds = (secondsRun === 60) ? true : false;
                            resetMinutes = (minutesRun === 59) ? true : false;

                            minutesRun = (isMinute) ? minutesRun + 1 : minutesRun;
                            hoursRun = (isHour) ? hoursRun + 1 : hoursRun;
                            secondsRun = (resetSeconds) ? 0 : secondsRun;
                            minutesRun = (resetMinutes) ? 0 : minutesRun;
                            
                            newTodos[index].percentage = ((secondsTotal+secondsPass)* 100) / seconds;
                            newTodos[index].achieved = `${addPadding(hoursRun)}:${addPadding(minutesRun)}:${addPadding(secondsRun)}`;

                            setTime(`${addPadding(hoursRun)}:${addPadding(minutesRun)}:${addPadding(secondsRun)}`);

                        } else {
                            completeTask(todoTimer);
                            clearInterval(timer)
                        }
                    } else if (newTodos[index].state === 'reset') {
                        newTodos[index].isCompleted = false;
                        newTodos[index].percentage = 0;
                        newTodos[index].achieved = '00:00:00';
                        clearInterval(timer)
                    }
                    updateLocalStorage(newTodos);
                    return newTodos;
                })

            }, 1000);
        }


    }, [todoTimer])

    return (
        <Context.Provider value={{
            ownerName,
            todos,
            loading,
            error,
            countTODOs,
            timeTODOs,
            searchedTodos,
            completedTodos,
            search,
            openModal,
            setSearch,
            addPadding,
            removeTask,
            resetTask,
            completeTask,
            operateCount,
            pauseTimeTask,
            runTimeTask,
            setOpenModal,
            addTask,
            editTask,
            preloadInfo, 
            setPreloadInfo,
        }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }