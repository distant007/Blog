/* eslint-disable indent */
export const editProfile =
  (username, email, password = '', image = '', token) =>
  async (dispatch) => {
    const res = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
          image: image,
        },
      }),
    })
    const body = await res.json()
    if (!res.ok) {
      dispatch({ type: 'RES', payload: body })
    } else {
      dispatch({ type: 'RES', payload: 'ok' })
      localStorage.setItem('username', body.user.username)
      localStorage.setItem('email', body.user.email)
      localStorage.setItem('password', password)
      localStorage.setItem('token', body.user.token)
      localStorage.setItem('image', body.user.image)
    }
  }
