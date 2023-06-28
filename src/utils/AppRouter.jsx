import { Route, Routes } from 'react-router-dom';

// public
import HomePage from '../components/pages/HomePage.jsx'
import SignUp from '../components/pages/SignUp.jsx'
import ErrorPage from '../components/pages/ErrorPage.jsx'

// auth
import Dashboard from '../components/pages/Dashboard.jsx'
import Profile from '../components/pages/Profile.jsx'


// Middleware
import AuthGuard from '../services/AuthGuard.jsx'


const AppRouter = () => {
    return (
        <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/signup' element={<SignUp />} />
                <Route path='/auth' element={<AuthGuard />}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}


export default AppRouter;