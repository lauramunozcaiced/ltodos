import './Create.css'

/*Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointDown } from '@fortawesome/free-solid-svg-icons'

function Create({openModal}){
    return (
        <div className='createButton'>
            <FontAwesomeIcon className='animate__animated animate__bounce animate__delay-2s animate__infinite' icon={faHandPointDown} />
            <button onClick={openModal} className='ri-add-line'></button>
        </div>
        
    )
}

export {Create};