import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author { name }
    published
    genres
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author { name }
    published
    genres
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(
      name: $name, 
      setBornTo: $setBornTo) {
    name
    born
  }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  )
  {
    value
  }
}
`

const ME = gql`
query {
  me { username, favoriteGenre}
}`

const BOOKS_BY_GENRE = gql`
query($genre: String) {
  allBooks(genre: $genre){
    title
    author { name }
    published
    genres
  }
}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      published
    }
  }
`

export { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR, LOGIN, ME, BOOKS_BY_GENRE, BOOK_ADDED }
