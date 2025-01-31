import useApiRequest from '../hooks/useApiRequest'

const basePath="http://localhost:3000/api"

const useApi = () => {
  const { request } = useApiRequest()

  const login = async (email: string, password: string) => {
    return request('post', `${basePath}/user/login`, {
      email,
      password,
    })
  }

  const register = async (email: string, password: string) => {
    return request('post', `${basePath}/user/register`, {
      email,
      password,
    })
  }

  const editUser = async (userId: string, userData: Record<string, any>) => {
    return request('put', `${basePath}/user/`, userData)
  }

  const getUser = async (userId: string) => {
    return request('get', `${basePath}/user/${userId}`)
  }
  const getAuthorNameByRecipeId = async (recipeId: string) => {
    return request(
      'get',
      `${basePath}/recipes/author/name/${recipeId}`,
    )
  }

  return { login, register, editUser, getUser, getAuthorNameByRecipeId }
}

export default useApi
