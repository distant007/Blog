import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import Loader from '../UI/Loader/Loader'
import BlogItem from '../BlogItem/BlogItem'
import PaginationTabs from '../UI/PaginationTabs/PaginationTabs'
import { getList } from '../../services/getList'
import Error from '../UI/Error/Error'

import styles from './BlogList.module.scss'
const BlogList = () => {
  const list = useSelector((state) => state.listReducer.list)
  const offset = useSelector((state) => state.listReducer.offset)
  const error = useSelector((state) => state.listReducer.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getList(offset))
  }, [offset])
  const linkToArticle = (item) => {
    localStorage.setItem('slug', item.slug)
    const slug = localStorage.getItem('slug')
    dispatch({ type: 'ARTICLE', payload: item })
    navigate(`article/${slug}`)
  }
  const loader = list.length === 0 && !error ? <Loader /> : null
  const errorIndicate = error && !loader ? <Error /> : null
  const view = !loader ? <View list={list} linkToArticle={linkToArticle} /> : null
  const pagination = list.length !== 0 && !loader ? <PaginationTabs /> : null
  return (
    <div className={styles.main}>
      {loader}
      {view}
      {errorIndicate}
      {pagination}
    </div>
  )
}
const View = ({ list, linkToArticle }) => {
  const item = list.map((item) => (
    <li key={uuidv4()} className={styles.content}>
      <BlogItem item={item} linkToArticle={linkToArticle} />
    </li>
  ))
  return <ul className={styles.list}>{item}</ul>
}
export default BlogList
