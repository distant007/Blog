/* eslint-disable indent */
import { Form, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

import styles from './ArticleForm.module.scss'

const ArticleForm = (props) => {
  const { onFinish, article } = props
  const [loadTags, setLoadTags] = useState(true)
  const [tags, setTags] = useState([''])
  useEffect(() => {
    if (loadTags && article) {
      setLoadTags(false)
      setTags([...article.tagList])
    } else {
      setLoadTags(false)
    }
  })
  const deleteTag = (name) => {
    setTags([...tags.filter((item) => item !== name)])
  }
  const addTag = () => {
    setTags(() => [...tags, ''])
  }
  const title = article ? 'Edit article' : 'Create new article'
  const values = article ? article.tagList : null
  let name = 0
  const tagsInputs = tags.map((item) => <InputTag key={uuidv4()} tags={name++} item={item} deleteTag={deleteTag} />)
  return (
    <div className={styles.article}>
      <h2 className={styles.header}>{title}</h2>
      <Form
        name="article"
        className={styles.login}
        initialValues={{
          title: article ? article.title : null,
          description: article ? article.description : null,
          text: article ? article.body : null,
          ...values,
        }}
        onFinish={onFinish}
      >
        <p className={styles.name}>Title</p>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполненно',
            },
          ]}
        >
          <Input placeholder="Title" className={styles.input} />
        </Form.Item>
        <p className={styles.name}>Short description</p>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполненно',
            },
          ]}
        >
          <Input placeholder="Short description" className={styles.input} />
        </Form.Item>
        <p className={styles.name}>Text</p>
        <Form.Item
          name="text"
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполненно',
            },
          ]}
        >
          <Input.TextArea type="textarea" placeholder="Text" className={styles.text} />
        </Form.Item>
        <p className={styles.name}>Tags</p>
        <div className={styles.tagsPlace}>
          <div className={styles.inputs}>{tagsInputs}</div>
          <Button className={styles.addTag} onClick={addTag}>
            Add tag
          </Button>
        </div>
        <Form.Item className={styles.item}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const InputTag = ({ tags, item, deleteTag }) => (
  <div className={styles.tags}>
    <Form.Item
      name={tags}
      rules={[
        {
          message: 'Поле должно быть заполненно',
        },
      ]}
    >
      <Input placeholder="Tag" className={styles.tag} />
    </Form.Item>
    <Button className={styles.delete} type="button" onClick={() => deleteTag(item)}>
      Delete
    </Button>
  </div>
)

export default ArticleForm
