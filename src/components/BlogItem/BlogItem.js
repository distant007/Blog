import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import defaultImg from '../../assets/images/default.svg'
import likesImg from '../../assets/images/likes.svg'
import likedImg from '../../assets/images/liked.svg'
import { likesArticle, unLike, getList, deleteArticle } from '../../services/blogServices'

import styles from './BlogItem.module.scss'
import './Confirm.css'
const BlogItem = (props) => {
  const { item, showButton, linkToArticle } = props
  const [onDelete, setDelete] = useState(false)
  const [hadLike, setHadLike] = useState(item.favorited)
  const [hasErrorImg, setHasErrorImg] = useState(false)
  const [likes, setLikes] = useState(item.favoritesCount)
  const offset = useSelector((state) => state.listReducer.offset)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const slug = localStorage.getItem('slug')
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (onDelete === true) {
      dispatch(getList(offset))
      navigate('/')
      setDelete(false)
    }
  })
  const kitcut = (text, limit) => {
    text = text.trim()
    if (text.length <= limit) return text

    text = text.slice(0, limit)

    return text.trim() + '...'
  }
  const checkTags = () => {
    const tags = [...item.tagList]
      .filter((item) => item !== null && item.length < 50)
      .map((item) => (
        <button key={uuidv4()} className={styles.tag}>
          {item}
        </button>
      ))
    return tags
  }
  const onLike = () => {
    let like = likes
    if (username !== 'null') {
      if (hadLike === false) {
        dispatch(likesArticle(token, item.slug))
        setHadLike(true)
        setLikes(++like)
      } else {
        dispatch(unLike(token, item.slug))
        setHadLike(false)
        setLikes(--like)
      }
    }
  }
  const description = item.description.length > 450 ? kitcut(item.description, 450) : item.description
  const title = item.title ? (item.title.length > 45 ? kitcut(item.title, 45) : item.title) : null
  const tags = item.tagList ? checkTags() : null
  const date = format(new Date(item.createdAt), 'PP')
  const buttonDelete =
    showButton && item.author.username === username ? (
      <button className={styles.delete} onClick={() => ShowConfirm(slug, dispatch, setDelete)}>
        Delete
      </button>
    ) : null
  const buttonEdit =
    showButton && item.author.username === username ? (
      <Link className={styles.edit} to={`/article/${slug}/edit`}>
        Edit
      </Link>
    ) : null
  return (
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <div className={styles.header}>
          <h2 className={styles.title} onClick={() => linkToArticle(item)}>
            {title}
          </h2>
          <button className={styles.likes} onClick={onLike}>
            <img className={styles.likes} src={hadLike ? likedImg : likesImg} alt="likes" />
            <p>{likes}</p>
          </button>
        </div>
        <div className={styles.tags}>{tags}</div>

        <ReactMarkdown className={styles.description}>{description}</ReactMarkdown>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.user}>
          <div className={styles.info}>
            <p className={styles.name}>{item.author.username}</p>
            <p className={styles.date}>{date}</p>
          </div>
          <img
            className={styles.img}
            src={hasErrorImg ? defaultImg : item.author.image}
            onError={() => setHasErrorImg(true)}
            alt="avatar"
          />
        </div>
        {buttonDelete}
        {buttonEdit}
      </div>
    </div>
  )
}

const ShowConfirm = (slug, dispatch, setDelete) => {
  const { confirm } = Modal
  confirm({
    wrapClassName: 'modalWindow',
    title: 'Are you sure to delete this article?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    cancelText: 'No',
    onOk() {
      setDelete(true)
      const token = localStorage.getItem('token')
      dispatch(deleteArticle(token, slug))
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

export default BlogItem
