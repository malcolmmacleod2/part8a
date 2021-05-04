import React, {useState, useEffect} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries/queries'


const Books = (props) => {
  
  const [genre, setGenre] = useState(null)

  const allBooks = useQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network"
  }) 

  const [getBooksByGenre, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre },
    fetchPolicy: "cache-and-network"
  }) 

  useEffect(() => {
    console.log({genre})
    if (genre) {
      getBooksByGenre(genre)
    }
  }, [genre, getBooksByGenre])

  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  console.log({data})
  console.log({allBooks})

  let genres = []

  for (let book of allBooks.data.allBooks) {
    for (let genre of book.genres) {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    }
  }

  let books = data && data.allBooks ? data.allBooks : allBooks.data.allBooks

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      </div>
    </div>
  )
}

export default Books