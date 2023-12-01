import React, { FC } from 'react';
import MainForm from './MainForm.tsx';

const Index: FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
        }}>
            <MainForm />
        </div>
    );
};

export default Index;
