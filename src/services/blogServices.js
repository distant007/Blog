/* eslint-disable indent */
export const deleteArticle = (token, slug) => async (dispatch) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const response = await res.json()
    dispatch({ type: 'ERRCREATE', payload: response })
  } else {
    dispatch({ type: 'CREATE', payload: 'ok' })
  }
}
export const editArticle = (title, description, body, token, slug, tagList) => async (dispatch) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
      },
    }),
  })
  const response = await res.json()
  if (!res.ok) {
    dispatch({ type: 'ERRCREATE', payload: response })
    dispatch({ type: 'EDIT', payload: null })
  } else {
    dispatch({ type: 'EDIT', payload: 'ok' })
    dispatch({ type: 'ERRCREATE', payload: null })
  }
}
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
export const getList = (offset) => async (dispatch) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  const body = await res.json()
  if (res.ok) {
    dispatch({ type: 'LIST', payload: body.articles, count: body.articlesCount })
  } else {
    dispatch({ type: 'ERROR', payload: body })
  }
}
export const getArticle = (slug) => async (dispatch) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  const body = await res.json()
  if (res.ok) {
    dispatch({ type: 'ARTICLE', payload: body.article })
  }
}
export const likesArticle = (token, slug) => async (dispatch) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  const body = await res.json()
  if (res.ok) {
    dispatch({ type: 'ARTICLE', payload: body.article })
  }
}
export const unLike = (token, slug) => async (dispatch) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  const body = await res.json()
  if (res.ok) {
    dispatch({ type: 'ARTICLE', payload: body.article })
  }
}
export const postArticle = (title, description, body, tagList, token) => async (dispatch) => {
  const res = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
      },
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })
  const response = await res.json()
  console.log(response)
  if (!res.ok) {
    dispatch({ type: 'ERRCREATE', payload: response })
  } else {
    dispatch({ type: 'CREATE', payload: 'ok' })
  }
}
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
    dispatch({ type: 'ERRORSING', payload: body })
  } else {
    dispatch(singIn(email, password))
  }
}
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
