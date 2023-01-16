import { message } from 'antd'
import { useEffect, useReducer, useState } from 'react'
import { NoticeType } from 'antd/es/message/interface'

export default () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [noticeType, setNoticeType] = useState<NoticeType | undefined>()
  const [noticeContent, setNoticeContent] = useState('')
  const noticeInput = (
    noticeType: NoticeType | undefined,
    noticeContent: string
  ) => {
    setNoticeType(noticeType)
    setNoticeContent(noticeContent)
  }
  useEffect(() => {
    if (noticeType && noticeContent) {
      messageApi.open({
        type: noticeType,
        content: noticeContent,
        onClose: () => noticeInput(undefined, '')
      })
    }
  }, [noticeType, noticeContent])

  return [noticeInput, contextHolder] as const
}
