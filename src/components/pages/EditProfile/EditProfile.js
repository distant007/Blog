import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import { editProfile } from '../../../services/blogServices'

import styles from './EditProfile.module.scss'
const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = localStorage.getItem('username')
  const [onEdit, setEdit] = useState(false)
  useEffect(() => {
    if (onEdit === true) {
      setEdit(false)
      navigate('/')
    } else if (user === 'null') {
      navigate('/')
    }
  })
  const onFinish = (values) => {
    const token = localStorage.getItem('token')
    dispatch(editProfile(values.username, values.email, values.password, values.image, token))
    setEdit(true)
  }
  return (
    <div className={styles.form}>
      <h2 className={styles.header}>Edit Profile</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
        }}
        onFinish={onFinish}
      >
        <p className={styles.name}>Username</p>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              min: 3,
              max: 20,
              message: 'Имя должно быть не менее 3 символов и не более 20',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <p className={styles.name}>Email address</p>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
              message: 'Please, write like this "example@mail.ru"',
            },
          ]}
        >
          <Input type="email" placeholder="Email address" />
        </Form.Item>
        <p className={styles.name}>New password</p>
        <Form.Item
          name="password"
          rules={[
            {
              min: 6,
              max: 40,
              message: 'Your password needs to be at least 6 characters.',
            },
          ]}
        >
          <Input type="password" placeholder="New password" />
        </Form.Item>
        <p className={styles.name}>Avatar image (url)</p>
        <Form.Item
          name="image"
          rules={[
            {
              message: 'Passwords must match',
            },
          ]}
        >
          <Input type="text" placeholder="Avatar image" />
        </Form.Item>
        <Form.Item className={styles.item}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default EditProfile
