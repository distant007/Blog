import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { singIn } from '../../services/singin'
import Header from '../Header/Header'
import BlogList from '../BlogList/BlogList'
import Article from '../Article/Article'
import Registration from '../Registration/Rigistration'
import SingIn from '../SingIn/SingIn'
import EditProfile from '../EditProfile/EditProfile'
import NewArticle from '../NewArticle/NewArticle'
import EditArticle from '../EditArticle/EditArtcile'

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
        <Route path="/" element={<BlogList />} />
        <Route path="article/:slug" element={<Article />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/singin" element={<SingIn />} />
        <Route path="/editing" element={<EditProfile />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="article/:slug/edit" component={EditArticle} element={<EditArticle />} />
      </Routes>
    </div>
  )
}

export default App
