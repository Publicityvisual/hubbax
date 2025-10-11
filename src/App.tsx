import { useActionState } from 'react'
import './App.css'

function App() {
  // Usando las nuevas APIs de React 19
  const [loginState, loginAction, isPending] = useActionState(
    async (_previousState: any, formData: FormData) => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      
      console.log('Login con React 19 Actions:', { email, password })
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular validación
      if (!email || !password) {
        return { error: 'Email y contraseña son requeridos' }
      }
      
      if (email === 'test@hubbax.com' && password === 'demo') {
        return { success: true, message: '¡Bienvenido a HubbaX!' }
      }
      
      return { error: 'Credenciales incorrectas' }
    },
    null
  )

  const handleCreateAccount = async () => {
    console.log('Crear cuenta nueva en HubbaX')
    // Aquí iría la navegación a registro
  }

  const handleForgotPassword = async () => {
    console.log('Recuperar contraseña')
    // Aquí iría la lógica para recuperar contraseña
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h1 className="logo">HubbaX</h1>
          <p className="tagline">
            Conecta con amigos y el mundo que te rodea en HubbaX.
          </p>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          {/* Usando React 19 form actions */}
          <form className="login-form" action={loginAction} aria-label="Formulario de inicio de sesión">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico o número de celular"
              className="login-input"
              aria-label="Correo electrónico o número de celular"
              required
              disabled={isPending}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="login-input"
              aria-label="Contraseña"
              required
              disabled={isPending}
            />
            <button type="submit" className="login-button" disabled={isPending}>
              {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            
            {/* Mostrar estado del login */}
            {loginState?.error && (
              <div className="error-message" role="alert">
                {loginState.error}
              </div>
            )}
            {loginState?.success && (
              <div className="success-message" role="alert">
                {loginState.message}
              </div>
            )}
            
            <button 
              type="button" 
              className="forgot-password"
              onClick={handleForgotPassword}
              disabled={isPending}
            >
              ¿Olvidaste la contraseña?
            </button>
            <div className="divider" role="separator"></div>
            <button 
              type="button" 
              className="create-account-button"
              onClick={handleCreateAccount}
              disabled={isPending}
            >
              Crear cuenta nueva
            </button>
          </form>
          <p className="create-page">
            <button 
              type="button"
              className="create-page-link"
              onClick={() => console.log('Crear página para empresa')}
            >
              <strong>Crear una página</strong>
            </button> para una celebridad, marca o empresa.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
