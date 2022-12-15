/* eslint-disable react/no-children-prop */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import { getArticle } from '../../../services/blogServices'
import BlockItem from '../../BlogItem/BlogItem'
import Loader from '../../UI/Loader/Loader'

import styles from './Article.module.scss'

const Article = () => {
  const item = useSelector((state) => state.articleReducer.article)
  const dispatch = useDispatch()
  useEffect(() => {
    const slug = localStorage.getItem('slug')
    dispatch(getArticle(slug))
  }, [dispatch])
  const showButton = true
  const view = item ? <BlockItem item={item} showButton={showButton} /> : null
  const loader = !item ? <Loader /> : null
  const itemText = item ? item.body : null

  return (
    <div className={styles.article}>
      {loader}
      {view}
      <div className={styles.body}>
        <ReactMarkdown children={itemText} />
      </div>
    </div>
  )
}

export default Article
