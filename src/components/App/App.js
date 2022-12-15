import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { singIn } from '../../services/blogServices'
import Header from '../Header/Header'
import BlogList from '../pages/BlogList/BlogList'
import Article from '../pages/Article/Article'
import Registration from '../pages/Registration/Rigistration'
import SingIn from '../pages/SingIn/SingIn'
import EditProfile from '../pages/EditProfile/EditProfile'
import NewArticle from '../pages/NewArticle/NewArticle'
import EditArticle from '../pages/EditArticle/EditArtcile'
import PrivetRoutes from '../PrivetRoutes/PrivetRoutes'

import styles from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.singInReducer.user)
  useEffect(() => {
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    if (data === null && email !== 'null') {
      dispatch(singIn(email, password))
    }
  })
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route element={<PrivetRoutes />}>
          <Route path="/editing" element={<EditProfile />} />
          <Route path="article/:slug/edit" component={EditArticle} element={<EditArticle />} />
          <Route path="/new-article" element={<NewArticle />} />
        </Route>
        <Route path="/" element={<BlogList />} />
        <Route path="article/:slug" element={<Article />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/singin" element={<SingIn />} />
      </Routes>
    </div>
  )
}

export default App
