import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface BlankLayoutProps {
    children: React.ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default BlankLayout;
