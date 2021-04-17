import React, {useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries/queries'

const BirthYear = () => {
    const [authorName, setAuthorName] = useState('')
    const [born, setBorn] = useState(0)

    const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, { 
        refetchQueries: [ {query: ALL_AUTHORS}, {query: ALL_BOOKS}],
        onError: (error) => {console.log({error})}
    })

    useEffect(() => {
        if(result.data && result.data.born === null) {
            
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
    
        console.log('add book...')
        const bornYear = parseInt(born)
        console.log({bornYear})
        editAuthor( { variables: {name: authorName, setBornTo: bornYear}})

        setAuthorName('')
        setBorn(0)
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                name
                <input
                    value={authorName}
                    onChange={({ target }) => setAuthorName(target.value)}
                />
                </div>
                <div>
                born
                <input
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                </div>
               
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthYear