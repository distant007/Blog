/* eslint-disable indent */
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
