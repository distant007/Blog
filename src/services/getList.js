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
export const getArticle = (slug) => {
  return function (dispatch) {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then((json) => dispatch({ type: 'ARTICLE', payload: json.article }))
  }
}
