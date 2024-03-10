import React from 'react';

/*Images */
import logo from '../logo.svg'

/* Components */
import { Counter } from '../components/Counter/Counter';
import { ItemCount } from '../components/ItemCount/ItemCount';
import { ItemTime } from '../components/ItemTime/ItemTime';
import { Search } from '../components/Search/Search';
import { List } from '../components/List/List';
import { Create } from '../components/Create/Create';
import { Loading } from '../components/Loading/Loading';
import { Error } from '../components/Error/Error';
import { Empty } from '../components/Empty/Empty';
import { Context } from '../Context/Context';
import { Modal } from '../components/Modal/Modal';
import { Form } from '../components/Form/Form';
import { Name } from '../components/Name/Name';

/*Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPeace } from '@fortawesome/free-solid-svg-icons'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'

/*Remix Icons */
import 'remixicon/fonts/remixicon.css';

/*Animate */
import 'animate.css';

function AppUI() {
    const {
        todos,
        loading,
        error,
        countTODOs,
        timeTODOs,
        searchedTodos,
        completedTodos,
        search,
        setSearch,
        removeTask,
        resetTask,
        completeTask,
        operateCount,
        pauseTimeTask,
        runTimeTask,
        openModal,
        setOpenModal,
        editTask,
        setPreloadInfo,
        preloadInfo,
        openName,
        setOpenName,
        ownerName,
        setOwnerName,
        saveOwnerName,
        startTracker
    } = React.useContext(Context);

    return (
        <React.Fragment>
            <div className='container'>
                <div className='head'>
                    <div className='logoContainer'>
                        <img src={logo} width={40} />
                    </div>
                    <p><FontAwesomeIcon icon={faHandPeace} /> Hello, <b className='link' onClick={()=> {setOpenName(true)}}>{(ownerName!= '')? ownerName : 'Friend'}</b></p>
                    <h2>Manage <br></br>your tasks</h2>
                    <Counter completed={completedTodos.length} total={todos.length} />
                    <div className='searchContainer'>
                        <Search search={search} setSearch={setSearch} />
                    </div>
                </div>
                {loading && <Loading />}
                {error && <Error />}
                {!loading && !error && searchedTodos.length === 0 && <Empty />}
                {!loading && !error && searchedTodos.length > 0 &&
                    <div className='tasks'>

                        <div className='timeTasks'>
                            <p>Time tasks ({searchedTodos.filter(todo => todo.type === 'time').length})</p>
                            <List type='scroll'>
                                {(timeTODOs.length > 0) ? (timeTODOs.map(todo => (<ItemTime 
                                setPreloadInfo={()=> {setPreloadInfo(todo)}} 
                                run={() => { runTimeTask(todo.id) }} 
                                pause={() => pauseTimeTask(todo.id)} 
                                key={todo.id} 
                                todo={todo} 
                                edit={editTask}
                                reset={() => { resetTask(todo.id) }} 
                                delete={() => { removeTask(todo.id) }} 
                                openModal={()=>{setOpenModal(true)}} 
                                complete={() => { completeTask(todo.id) }} 
                                />))) : (<small>There are not TODOS to show</small>)}
                            </List>
                        </div>
                        <div className='countTask'>
                            <p>Count tasks ({searchedTodos.filter(todo => todo.type === 'count').length})</p>
                            <List type='grid'>
                                {(countTODOs.length > 0) ? (countTODOs.map(todo =>
                                (<ItemCount setPreloadInfo={()=>{setPreloadInfo(todo)}} reset={() => { resetTask(todo.id) }} complete={() => { completeTask(todo.id) }} insert={() => { operateCount(todo.id, true) }}
                                    extract={() => { operateCount(todo.id) }} delete={() => { removeTask(todo.id) }} key={todo.id} text={todo.text} percentage={todo.percentage}
                                    description={todo.description} priority={todo.priority} goal={todo.goal} achieved={todo.achieved.toString()} isCompleted={todo.isCompleted} edit={editTask} 
                                    openModal={()=>{setOpenModal(true)}}  />)))
                                    : (<small>There are not TODOS to show</small>)}
                            </List>
                        </div>
                    </div>
                }
                <Create openModal={()=>{setOpenModal(true)}} />
                {openModal && (
                    <Modal>
                        <div>
                            <button onClick={()=>{
                                setOpenModal(false);
                                setPreloadInfo(null);}} className='close ri-arrow-go-back-line'></button>
                            <h4 className='title'>{(preloadInfo)? 'Edit this': 'Create a new'} <b>TODO</b></h4>
                            <div>{(preloadInfo)? 'Do you want to change something?' : 'Do you have something to do?' }</div>
                            <Form />
                        </div>
                    </Modal>
                )}
                {openName && (
                    <Name>
                        <div>
                        <button onClick={()=>{
                                setOpenName(false);
                                (ownerName === '') && setOwnerName('')}} className='close ri-arrow-go-back-line'></button>
                        <div>Hi friend, first ...</div>
                        <h4 className='title'>how would you like us to tell you?</h4>
                        <input type='text' onChange={(e)=> {setOwnerName(e.target.value)}} value={ownerName}/>
                        <button className='submit' onClick={saveOwnerName}>Save</button>
                        </div>
                    </Name>
                )}
            </div>
            </React.Fragment>
    )
}

export { AppUI };