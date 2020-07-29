import React from 'react';

export const Modal = ({clases = '', children}) => {
    <div className={`modal-container ${clases}`}>
        {children}
    </div>
};