import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password })
    // Aquí iría la lógica de autenticación
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h1 className="logo">HubbaX</h1>
          <p className="tagline">
            HubbaX te ayuda a conectar y compartir con las personas en tu vida.
          </p>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
            <div className="divider"></div>
            <button type="button" className="create-account-button">
              Crear cuenta nueva
            </button>
          </form>
          <p className="create-page">
            <a href="#"><strong>Crea una página</strong></a> para una celebridad, una marca o un negocio.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
