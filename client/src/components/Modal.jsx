import React from 'react';

export const Modal = ({ msg, onOk, onClose }) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header"></div>
                <h4 className="modal-title">Modal title</h4> </div>
            <div className="modal-body" >This is modal content</div>
            <div className="modal-footer">
                <button onClick={props.onClose} className="button">Close</button>
            </div>
        </div>
  );
};

