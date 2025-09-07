import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Donations from '../pages/Donations';
import Matches from '../pages/Matches';
import CharityView from '../pages/CharityView';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={token ? <Dashboard /> : <Navigate to='/login' />}
        >
          <Route
            path='donations'
            element={
              <ProtectedRoute role='donor'>
                <Donations />
              </ProtectedRoute>
            }
          />
          <Route
            path='matches'
            element={
              <ProtectedRoute>
                <Matches />
              </ProtectedRoute>
            }
          />
          <Route
            path='charity'
            element={
              <ProtectedRoute role='recipient'>
                <CharityView />
              </ProtectedRoute>
            }
          />
          <Route index element={<Navigate to='/donations' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
