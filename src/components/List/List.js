import './List.css'

function List({children,type}){
    return (
        <div className={`taskList ${type}`}>{children}</div>
    )
}

export {List};