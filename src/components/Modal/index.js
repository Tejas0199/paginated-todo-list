import { createPortal } from 'react-dom';
import './styles.css';
import Button from '../Button';

const Modal = ({children, onClose, onDone, header, successText = 'Create', rejectText = 'Cancel' }) => {
	return createPortal(<div className='modal-wrapper' onClick={onClose}>
		<div className='modal' onClick={(event) => event.stopPropagation()}>
			<div className='modal-header'>
				<h3>{header || 'Modal title'}</h3>
				<p className='close' onClick={onClose}>Close</p>
			</div>
			<div className='modal-body'>{
				children
}</div>
			<div className='modal-footer'>
				<Button type='secondary' text={rejectText} onClick={onClose}/>
				<Button type='primary' text={successText} onClick={onDone}/>
			</div>
		</div>
	</div>, document.body)
}

export default Modal;