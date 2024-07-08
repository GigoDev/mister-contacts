const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const {Provider} = ReactRedux
import { store } from './store/store.js'


import { HomePage } from './pages/HomePage.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'
import { ContactDetails } from './pages/ContactDetails.jsx'


export function App() {
  
    return (
            <Provider store={store}>
                <Router>
                    <section className="app">
                        <main className='main-layout'>
                            <Routes>
                                <Route element={<HomePage />} path="/" />
                                <Route element={<ContactIndex />} path="/contact" />
                                <Route element={<ContactDetails />} path="/contact/:contactId" />
                            </Routes>
                        </main>
                    </section>
                </Router>
            </Provider>
    )
}






