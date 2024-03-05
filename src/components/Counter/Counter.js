import './Counter.css'

function Counter({completed, total}){
    return(
      <p className='counter'>You have completed <b>{completed}</b> of <b>{total}</b> TODOS</p>
    )
  }

export {Counter};