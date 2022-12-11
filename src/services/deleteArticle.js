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
