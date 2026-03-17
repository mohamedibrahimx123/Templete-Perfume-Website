import { createContext, useContext, useState } from 'react'

const IntroContext = createContext(null)

const SKIP_INTRO_PATHS = ['/support', '/cart']

export function IntroProvider({ children }) {
  const [introDone, setIntroDone] = useState(false)

  const shouldShowIntro = (pathname) => !SKIP_INTRO_PATHS.includes(pathname)

  const completeIntro = () => setIntroDone(true)

  return (
    <IntroContext.Provider value={{ introDone, completeIntro, shouldShowIntro }}>
      {children}
    </IntroContext.Provider>
  )
}

export function useIntro() {
  const context = useContext(IntroContext)
  if (!context) throw new Error('useIntro must be used within IntroProvider')
  return context
}
