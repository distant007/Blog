import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivetRoutes = () => {
  const user = useSelector((state) => state.singInReducer.user)
  return user ? <Outlet /> : <Navigate to="/singin" />
}
export default PrivetRoutes
