import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <header className="header">
                <h1>Welcome to Our Website</h1>
            </header>
            <nav className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Main Content</h2>
                <p>This is the main content area where you can add your website's main features and information.</p>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
