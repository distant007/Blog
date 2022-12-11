export const singIn = (email, password) => async (dispatch) => {
  const res = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      },
    }),
    headers: { 'content-type': 'application/json' },
  })
  const body = await res.json()
  if (res.ok) {
    dispatch({ type: 'USER', payload: body })
    localStorage.setItem('username', body.user.username)
    localStorage.setItem('email', body.user.email)
    localStorage.setItem('password', password)
    localStorage.setItem('token', body.user.token)
  } else {
    dispatch({ type: 'ERRORSING', payload: body })
  }
}
