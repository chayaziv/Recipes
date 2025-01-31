import { useState, useCallback, useContext } from 'react'
import axios, { AxiosError } from 'axios'
import { AuthContext } from '../reducer/userReducer'

const useApiRequest = () => {
  const { auth, userDispatch } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openError, setOpenError] = useState(false)
  const [response, setResponse] = useState<Response>({
    ok: false,
    status: 0,
    data: null,
  })

  type Response = {
    ok: boolean
    status: number
    data: any
  }

  const request = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      data?: any,
    ) => {
      setLoading(true)
      try {
        const res = await axios({
          method,
          url,
          data,
          headers: { 'user-id': '' + auth.user?.id || '' },
        })

        setLoading(false)

        return { ok: true, status: res.status, data: res.data }
      } catch (error) {
        setLoading(false)
        const err = error as AxiosError
        if (err.response) {
          const { status, data }: { status: number; data: any } = err.response
          return { ok: false, status, data: data.message }
        }
      }
    },
    [auth, userDispatch],
  )

  return { request, loading, openError, error }
}

export default useApiRequest
