import React, {useState, useEffect} from 'react'
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries'


const Books = (props) => {
  
  const [genre, setGenre] = useState(null)

  const [getBooksByGenre, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: genre }
  }) 

  useEffect(() => {
    if (genre) {
      getBooksByGenre(genre)
    } else {
      getBooksByGenre()
    }
      
  }, [genre, getBooksByGenre])

  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  console.log({data})

  let allBooks = data.allBooks 

  let genres = []

  for (let book of allBooks) {
    for (let genre of book.genres) {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    }
  }

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
          {allBooks.map(a =>
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