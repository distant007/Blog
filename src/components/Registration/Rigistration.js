import { Button, Form, Input, Checkbox } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { registration } from '../../services/registration'

import styles from './Registration.module.scss'
const Registration = () => {
  const [password, setPass] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const res = useSelector((state) => state.registrationReducer.res)
  const error = useSelector((state) => state.registrationReducer.error)
  console.log(res)
  const onFinish = (values) => {
    dispatch(registration(values.username, values.email, values.password))
  }
  useEffect(() => {
    if (res) {
      navigate('/')
      dispatch({ type: 'RES', payload: null })
    }
  }, [res])
  const setPassword = (value) => {
    setPass(value)
  }
  return (
    <div className={styles.form}>
      <h2 className={styles.header}>Create new account</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
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
          <Input placeholder="Username" className={error ? (error.errors.username ? styles.back : null) : null} />
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
          <Input
            type="email"
            placeholder="Email address"
            className={error ? (error.errors.email ? styles.back : null) : null}
          />
        </Form.Item>
        <p className={styles.name}>Password</p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              min: 6,
              max: 40,
              message: 'Your password needs to be at least 6 characters.',
            },
          ]}
        >
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <p className={styles.name}>Repeat Password</p>
        <Form.Item
          name="passwordRepeat"
          rules={[
            {
              required: true,
              pattern: password,
              message: 'Passwords must match',
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item className={styles.checkbox}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className={styles.checkText}>I agree to the processing of my personal information</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item className={styles.item}>
          <Button className={styles.button} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      <p className={styles.suggest}>
        Already have an account?
        <Link className={styles.link} to="/singin">
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}
export default Registration
