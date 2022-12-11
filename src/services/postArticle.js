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
