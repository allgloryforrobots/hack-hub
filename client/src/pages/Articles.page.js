import React, { useEffect,useState } from 'react'
import { Container } from 'react-bootstrap'
import { getArticles } from '../http/articleAPI'
import { httpErrorHandler } from '../components/notification'

const Articles = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        
        getArticles()
            .then(res => setArticles(res.rows)) 
            .catch(err => httpErrorHandler(err))

    }, [])

    return (
        <Container>
            { articles.map(article => <div key={article.id}>{article.id}</div>) }
        </Container>
    )
}

export default Articles