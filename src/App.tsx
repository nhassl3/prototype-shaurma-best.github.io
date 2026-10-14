import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import store from './store'

function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(() => {window.scrollTo({top: 0, behavior: "smooth"}); }, [pathname]);
  return null;
}

export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
