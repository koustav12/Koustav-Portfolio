import { Routes, Route } from 'react-router-dom'
import { SiteNav } from './components/SiteNav'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <SiteNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}
