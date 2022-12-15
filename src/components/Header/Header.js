import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import userImg from '../../assets/images/user.svg'
import { getList } from '../../services/blogServices'

import styles from './Header.module.scss'

const Header = () => {
  const data = useSelector((state) => state.singInReducer.user)
  const offset = useSelector((state) => state.listReducer.offset)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch({ type: 'USER', payload: null })
    localStorage.setItem('username', null)
    localStorage.setItem('email', null)
    localStorage.setItem('token', null)
    navigate('/')
  }
  const DeleteSlug = () => {
    dispatch({ type: 'ARTICLE', payload: null })
    dispatch(getList(offset))
  }
  const singIn = data ? (
    <User data={data} img={userImg} />
  ) : (
    <Link className={styles.singIn} to="/singin">
      Sign In
    </Link>
  )
  const regist = data ? (
    <button className={styles.logOut} onClick={logOut}>
      Log out
    </button>
  ) : (
    <Link className={styles.singUp} to="/registration">
      Sign Up
    </Link>
  )
  const newArticle = data ? (
    <Link className={styles.create} to="/new-article">
      Create article
    </Link>
  ) : null
  return (
    <div className={styles.header}>
      <div className={styles.leftSide}>
        <Link className={styles.logo} to="/" onClick={DeleteSlug}>
          Realworld Blog
        </Link>
      </div>
      <div className={styles.rightSide}>
        {newArticle}
        {singIn}
        {regist}
      </div>
    </div>
  )
}
const User = ({ data, img }) => (
  <Link className={styles.user} to="/editing">
    <p className={styles.name}>{data.user.username}</p>
    <img src={img} alt="" />
  </Link>
)
export default Header
