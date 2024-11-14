import { Routes, Route } from 'react-router-dom';
// import { useState } from 'react'

import Header from './components/Header';
import Footer from './components/Footer';

import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import PetForm from './pages/PetForm';
import PostForm from './pages/PostForm';



function App() {

  return (
    <>
      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />

          <Route path="/pet" element={<PetForm />} />
          <Route path="/post" element={<PostForm />} />

          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
