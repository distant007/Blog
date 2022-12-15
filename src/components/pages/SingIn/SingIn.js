import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { singIn } from '../../../services/blogServices'

import styles from './SingIn.module.scss'
const SingIn = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.singInReducer.user)
  const error = useSelector((state) => state.singInReducer.error)
  const navigate = useNavigate()
  const onFinish = (values) => {
    dispatch(singIn(values.username, values.password))
  }
  useEffect(() => {
    if (data) {
      navigate('/')
    }
  }, [data])
  return (
    <div className={styles.form}>
      <h2 className={styles.header}>Sign In</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <p className={styles.name}>Email address</p>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input type="email" placeholder="Email address" className={error ? styles.red : null} />
        </Form.Item>
        <p className={styles.name}>Password</p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              min: 6,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input type="password" placeholder="Password" className={error ? styles.red : null} />
        </Form.Item>
        <Form.Item className={styles.item}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
      <p className={styles.suggest}>
        Don’t have an account?
        <Link className={styles.link} to="/registration">
          Sign Up
        </Link>
        .
      </p>
    </div>
  )
}
export default SingIn
