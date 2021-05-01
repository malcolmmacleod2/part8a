import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries'


const Books = (props) => {
  const result = useQuery(ALL_BOOKS) 
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  let allBooks = result.data.allBooks 

  let genres = []

  for (let book of allBooks) {
    for (let genre of book.genres) {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    }
  }

  const books = genre === null ? allBooks : allBooks.filter(b => b.genres.includes(genre))

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