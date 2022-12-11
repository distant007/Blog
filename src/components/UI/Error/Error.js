import { Alert, Space } from 'antd'
const Error = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Error Text" description="Can't load data" type="error" closable />
  </Space>
)
export default Error
