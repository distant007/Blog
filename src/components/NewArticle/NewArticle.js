/* eslint-disable react/no-children-prop */

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { postArticle } from '../../services/postArticle'
import ArticleForm from '../ArticleForm/ArticleForm'
import { getList } from '../../services/getList'

const NewArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const offset = useSelector((state) => state.listReducer.offset)
  const [onCreate, setCreate] = useState(false)
  useEffect(() => {
    if (onCreate === true) {
      setCreate(false)
      dispatch(getList(offset))
      navigate('/')
    }
  })
  const onFinish = (values) => {
    let tagList = []
    for (let prop in values) {
      if (Number(prop) || prop === '0') {
        tagList.push(values[prop])
      }
    }
    console.log(values)
    console.log(tagList)
    const token = localStorage.getItem('token')
    dispatch(postArticle(values.title, values.description, values.text, tagList, token))
    setCreate(true)
  }

  return <ArticleForm onFinish={onFinish} />
}

export default NewArticle
