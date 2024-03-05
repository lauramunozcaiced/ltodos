import './Loading.css'

function Loading(){
    return (
        <div className='skeleton-loading'>
            <div>
            <p className='text-loading'></p>
            <div className='taskList-loading'>
                <div className='taskTime-loading'></div>
                <div className='taskTime-loading'></div>
                <div className='taskTime-loading'></div>
            </div>
            </div>
            <div>
            <p className='text-loading'></p>
            <div className='taskGrid-loading'>
                <div className='taskCount-loading'></div>
                <div className='taskCount-loading'></div>
                <div className='taskCount-loading'></div>
                <div className='taskCount-loading'></div>
            </div>
            </div>
          </div>
    )
}

export {Loading};