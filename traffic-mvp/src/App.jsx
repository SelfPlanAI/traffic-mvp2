import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <h2 className="text-2xl mb-4">Welcome to the Traffic Guidance App</h2>
        <p>This is where the main content will go.</p>
      </main>
      <Footer />
    </div>
  );
};

export default App;
