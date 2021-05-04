import React, {useState, useEffect} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { BOOKS_BY_GENRE, ME } from '../queries/queries'


const RecommendedBooks = (props) => {
  
  const me = useQuery(ME)
  const [genre, setGenre] = useState()

  const [getBooksByGenre, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre },
    fetchPolicy: "cache-and-network"
  }) 

  useEffect(() => {
    if (me && me.data && me.data.me)
      setGenre(me.data.me.favoriteGenre)
      getBooksByGenre(genre)
  }, [me, genre, getBooksByGenre])

    
  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  } 

  console.log({data})
  const books = data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favourite genre {genre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks