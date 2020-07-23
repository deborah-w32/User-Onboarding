import React from 'react'

export default function Form(props){
    const {
        values,
        submit,
        inputChange,
        checkboxChange,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onCheckboxChange = evt => {
        const { term, checked } = evt.target
        checkboxChange(term, checked)
    }

    const onInputChange = evt => {
        const { term, value } = evt.target
        inputChange(term, value)
    }

    return(
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a New User</h2>
                <button disabled={disabled}>Submit</button>

                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <label>Name&nbsp;
                    <input
                        value={values.name}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label>Email&nbsp;
                    <input
                        value={values.email}
                        onChange={onInputChange}
                        name='email'
                        type='email'
                    />
                </label>

                <label>Password&nbsp;
                    <input
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        type='text'
                    />
                </label>
            </div>

            <div className='form-group checkbox'>
                <label>
                    <input
                    type="checkbox"
                    name='terms'
                    checked={values.terms === true}
                    onChange={onCheckboxChange}
                    />
                </label>
            </div>
        </form>
    )
}