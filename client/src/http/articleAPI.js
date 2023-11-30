import { $authHost, $host } from './index'

export const getArticleById = async (id) => {
    const { data } = await $host.get('api/article' + id)
    return data
}

export const getArticles = async () => {
    const { data } = await $host.get('api/article')
    return data
}

export const createArticle = async (article) => {
    const { data } = await $authHost.post('api/article', article)
    return data
}

export const changeArticle = async (article) => {
    const { data } = await $authHost.patch('api/article', article)
    return data
}

export const deleteArticle = async (id) => {
    const { data } = await $authHost.patch('api/article' + id)
    return data
}