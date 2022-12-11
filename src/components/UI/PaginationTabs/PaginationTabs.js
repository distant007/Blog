import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Pagination } from 'antd'
const PaginationTabs = () => {
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(1)
  const count = useSelector((state) => state.listReducer.count)
  const onChange = (page) => {
    dispatch({ type: 'OFFSET', payload: page * 5 })
    setCurrent(page)
  }
  return (
    <Pagination
      current={current}
      onChange={onChange}
      defaultPageSize={25}
      total={count}
      // disabled={}
      showSizeChanger={false}
    />
  )
}
export default PaginationTabs
