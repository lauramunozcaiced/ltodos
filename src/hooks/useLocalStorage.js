import React from "react";

// const defaultTodos = [
//   {id:1, text: 'Learning React', description: 'Study react on Platzi', type: 'time' , goal: '00:60:00', achieved: '00:00:00', state: 'init' , priority: 'high' , percentage: 0 ,isCompleted: false },
//   {id:2, text: 'Gym', description: 'Do the routine on the gym', type: 'time' , goal: '01:20:00', achieved: '00:00:00', state: 'init', priority: 'medium', percentage: 0 , isCompleted: false },
//   {id:3, text: 'Meditation', description: 'Do meditation time for relax', type: 'time' , goal: '00:20:00', achieved: '00:00:00', state: 'init', priority: 'low' , percentage: 0, isCompleted: false },
//   {id:4, text: 'Drink Water', description: 'Take 6 cups of water', type: 'count' , goal: '6', achieved: '0' , state: '', priority: 'high', percentage: 0 , isCompleted: false },
//   {id:5, text: 'Suplements', description: 'Take Biotin and Omega 3', type: 'count' , goal: '2', achieved: '0' , state: '',priority: 'high' , percentage: 0 , isCompleted: false },
//   {id:6, text: 'Wash Hair', description: 'Do the wash hair routine', type: 'count' , goal: '1', achieved: '0' , state: '', priority: 'high', percentage: 0 , isCompleted: false },
//   {id:7, text: 'Search about Good Food', description: 'Search videos on youtube about good food', type: 'count' , goal: '1', achieved: 0 , state: '', priority: 'medium' , percentage: 0, isCompleted: false },
//   {id:8, text: 'Cry a little', description: '', type: 'count' , goal: '5', achieved: '0' , state: '', priority: 'low' , percentage: 0, isCompleted: false },
// ]

// localStorage.setItem('TODOS_V1',JSON.stringify(defaultTodos));

function useLocalStorage(itemName,initialValue) {
    const [item, setItem] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
  
    React.useEffect(()=>{
        try{
          const localStorageItems = localStorage.getItem(itemName);
          let parsedItem;
    
          if(!localStorageItems){
            localStorage.setItem(itemName,JSON.stringify(initialValue));
            parsedItem = initialValue;
          }else{
            parsedItem = JSON.parse(localStorageItems);
            if(parsedItem.length > 0){
              parsedItem.forEach(item => {
                 item.state = "init";
              });
              updateLocalStorage(parsedItem);
            }
            setItem(parsedItem);
          }
    
          setLoading(false);
    
          }catch(error){
            setLoading(false);
            setError(true);
          }
     
    },[])
    
  
    
  
    const updateLocalStorage = (newItem) => {
      localStorage.setItem(itemName,JSON.stringify(newItem));
    }
  
    return [{item,
            setItem,
            updateLocalStorage,
            loading,
            error
          }];
  }

export {useLocalStorage};

