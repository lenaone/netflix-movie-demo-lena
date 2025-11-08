import { useState } from 'react'

import './App.css'
import AppLayout from './layout/AppLayout'
import Homepage from './pages/Homepage/Homepage'
import MoviePage from './pages/Movies/MoviePage'
import MovieDetailPage from './pages/MovieDetails/MovieDetailPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
   <Routes>
    <Route path="/" element={<AppLayout/>}>
      <Route index element={<Homepage />} />
      <Route path="movies">
        <Route index element={<MoviePage />}/>
        <Route path=":id" element={<MovieDetailPage/>}/>
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />}/>
   </Routes>
  )
}

export default App
