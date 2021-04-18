import React, {useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries/queries'
import Select from 'react-select'

const BirthYear = ({authors}) => {
    const [born, setBorn] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)

    const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, { 
        refetchQueries: [ {query: ALL_AUTHORS}, {query: ALL_BOOKS}],
        onError: (error) => {console.log({error})}
    })

    const options = authors.map(a => ({ value: a.name, label: a.name }))

    useEffect(() => {
        if(result.data && result.data.born === null) {
            
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()

        const author = authors.find(a => a.name === selectedOption.value)
        const bornYear = parseInt(born)
        console.log({bornYear})
        editAuthor( { variables: {name: author.name, setBornTo: bornYear}})
        setBorn(0)
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                name
                <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
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