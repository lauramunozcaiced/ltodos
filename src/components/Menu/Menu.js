import './Menu.css'

function Menu(props){

    const leEdit = (e) =>{
        props.openModal();
        props.setPreloadInfo();
    }
      return (
        <div className={`menu${props.type}`}>
            <button onClick={(e)=>{
                e.target.parentElement.classList.toggle('active');
            }}  className="ri-more-2-line"></button>
            <ul className="menuTask">
                <li><button className='ri-delete-bin-5-fill' onClick={props.delete}></button></li>
                <li><button className='ri-check-line' onClick={props.complete}></button></li>
                <li><button className='ri-edit-fill' onClick={leEdit}></button></li>
                <li><button className='ri-loop-left-fill' onClick={props.reset}></button></li>
                
            </ul>
        </div>
    )
}

export {Menu}