export const registration = (user, email, password) => async (dispatch) => {
  const res = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    body: JSON.stringify({
      user: {
        username: user,
        email: email,
        password: password,
      },
    }),
    headers: { 'content-type': 'application/json' },
  })
  const body = await res.json()
  if (!res.ok) {
    dispatch({ type: 'ERROR', payload: body })
  } else {
    dispatch({ type: 'RES', payload: 'ok' })
  }
}
