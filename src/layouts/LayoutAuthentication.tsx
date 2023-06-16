import React from 'react';
interface Props {
    children: any
}
const LayoutAuthentication: React.FC<Props> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default LayoutAuthentication;