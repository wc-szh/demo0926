import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/** 注册已合并至微信授权登录流程，首次登录时绑定手机号即可 */
export function RegisterPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login', { replace: true })
  }, [navigate])

  return null
}
