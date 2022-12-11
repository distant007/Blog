/* eslint-disable react/no-children-prop */
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ArticleForm from '../ArticleForm/ArticleForm'
import { editArticle } from '../../services/editArticle'
import { getArticle } from '../../services/getList'
// import styles from './EditArticle.module.scss'
const EditArticle = () => {
  const navigate = useNavigate()
  const article = useSelector((state) => state.articleReducer.article)
  const dispatch = useDispatch()
  const slug = localStorage.getItem('slug')
  const [onEdit, setEdit] = useState(false)
  useEffect(() => {
    if (onEdit === true) {
      setEdit(false)
      dispatch(getArticle(slug))
      navigate(`/article/${slug}`)
    }
  })
  const onFinish = (values) => {
    const token = localStorage.getItem('token')
    let tagList = []
    for (let prop in values) {
      if (Number(prop) || prop === '0') {
        tagList.push(values[prop])
      }
    }
    dispatch(editArticle(values.title, values.description, values.text, token, slug, tagList))
    setEdit(true)
    dispatch({ type: 'EDIT', payload: null })
    dispatch({ type: 'ERRCREATE', payload: null })
  }
  return <ArticleForm article={article} onFinish={onFinish} />
}
export default EditArticle
