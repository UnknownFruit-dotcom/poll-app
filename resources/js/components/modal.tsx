import { ReactNode} from 'react';
import './css/modal.css';

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode;
};

export default function Modal({isOpen, onClose, children}: ModalProps){
    if(!isOpen){
        return null;
    }
    
    return(
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <button className="modal_close" onClick={onClose} aria-label="Close">
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}