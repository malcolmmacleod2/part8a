import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries/queries'


const RecommendedBooks = (props) => {
  const result = useQuery(ALL_BOOKS) 
  const me = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  let allBooks = result.data.allBooks 
  const genre = me.data.me.favoriteGenre

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