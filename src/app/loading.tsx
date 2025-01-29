import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loading: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <SyncLoader color="orange" />
        </div>
    );
};

export default Loading;