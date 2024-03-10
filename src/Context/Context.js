import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import sound from '../completed.mp3'

const Context = React.createContext();

function Provider({ children }) {
    const [{ item: todos,
        setItem: setTodos,
        updateLocalStorage,
        loading,
        error
    }] = useLocalStorage('TODOS_V1', []);
    const [ownerName, setOwnerName] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [openName, setOpenName] = React.useState(false);
    const [preloadInfo, setPreloadInfo] = React.useState(null);

    const completedTodos = todos.filter(todo => !!todo.isCompleted);
    const searchedTodos = todos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()))

    const countTODOs = searchedTodos.filter(todo => todo.type === 'count')
    const timeTODOs = searchedTodos.filter(todo => todo.type === 'time')

    const completeAudio = new Audio(sound);

    const saveOwnerName = () => {
        localStorage.setItem('ownerName',ownerName);
        setOwnerName(localStorage.getItem('ownerName'));
        setOpenName(false);
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
        newTodos[index].achieved = (data.type === 'time')? data.goal : 0;
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

        newTodos[index].achieved = (newTodos[index].type === 'count') ? newTodos[index].goal : '00:00:00';
        newTodos[index].isCompleted = true;
        newTodos[index].percentage = 100;
        newTodos[index].state= "";

        setTodos(newTodos);
        updateLocalStorage(newTodos);
        completeAudio.play();
    }

    const resetTask = (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => todo.id === id);
     
        newTodos[index].isCompleted = (newTodos[index].isCompleted === true) && false;
        newTodos[index].achieved = (newTodos[index].type === 'count') ? '0' : newTodos[index].goal;
        newTodos[index].percentage = 0;
        newTodos[index].state = (newTodos[index].type === 'time') ? 'init' : '';
     
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
            id: (newTodos.length > 0) ? newTodos[newTodos.length - 1].id + 1: 1, 
            ...params,
            achieved: (params.type === 'time')? params.goal : '0', 
            state: (params.type === 'time')?'init':'' , 
            percentage: 0 ,
            endDate: '',
            isCompleted: false }
        )
        setTodos(newTodos);
        updateLocalStorage(newTodos);
    }


    const addPadding = (num) => {
        if (num === 0 || num === '') {
            return `00`;
        } else if (num < 10) {
            return `0${num.toString()}`;
        } else {
            return `${num.toString()}`;
        }
    }
    React.useEffect(()=> {
        const localStorageName = localStorage.getItem('ownerName');
        if(!localStorageName){
            setOpenName(true);
        }else{
            setOwnerName(localStorageName);
        }
    },[])


    return (
        <Context.Provider value={{
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
            setOpenModal,
            addTask,
            editTask,
            preloadInfo, 
            setPreloadInfo,
            setOpenName,
            openName,
            ownerName,
            setOwnerName,
            saveOwnerName,
            setTodos,
            updateLocalStorage
        }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }