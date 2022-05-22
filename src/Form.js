import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import formcss from './Form.css'
const reactFormContainer = document.querySelector('.react-form-container')

class ReactFormLabel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        )
    }
}

class ReactForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nomeComercial: props.NomeComercial,
            fabricante: '',
            nomeGenerico: '',
            bulaRemedio: '',
            valor: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let newState = {}

        newState[e.target.name] = e.target.value

        this.setState(newState)
    }


    handleSubmit = (e, message) => {
        e.preventDefault()

        let formData = {
            NomeComercial: this.state.nomeComercial,
            Fabricante: this.state.fabricante,
            NomeGenerico: this.state.nomeGenerico,
            BulaRemedio: this.state.bulaRemedio,
            Valor: this.state.valor
        }

        if (formData.NomeComercial.length < 1 || formData.Fabricante.length < 1 || formData.NomeGenerico.length < 1 || formData.Valor.length < 1) {
            return false
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/medicamento',
            data: {
                "NomeComercial": formData.NomeComercial,
                "Fabricante": formData.Fabricante,
                "NomeGenerico": formData.NomeGenerico,
                "BulaRemedio": formData.BulaRemedio,
                "Valor": formData.Valor
            }
        }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });


        /* this.setState({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        }) */
    }

    render() {
        return (
            <div>
                <button>Listagem Medicamentos</button>
                <form className='react-form' onSubmit={this.handleSubmit}>
                    <h1>Cadastrar novo medicamento</h1>
                    <fieldset className='form-group'>
                        <ReactFormLabel htmlFor='nomeComercial' title='Nome Comercial:' />

                        <input id='nomeComercial' className='form-input' name='nomeComercial' onChange={this.handleChange} type='text' required defaultValue={this.state.nomeComercial} />
                    </fieldset>

                    <fieldset className='form-group'>
                        < ReactFormLabel htmlFor='fabricante' title='Fabricante:' />

                        <input id='fabricante' className='form-input' name='fabricante' type='text' required onChange={this.handleChange} defaultValue={this.state.fabricante} />
                    </fieldset>

                    <fieldset className='form-group'>
                        < ReactFormLabel htmlFor='nomeGenerico' title='Nome Genérico:' />

                        <input id='nomeGenerico' className='form-input' name='nomeGenerico' type='text' required onChange={this.handleChange} defaultValue={this.state.nomeGenerico} />
                    </fieldset>

                    <fieldset className='form-group'>
                        < ReactFormLabel htmlFor='bulaRemedio' title='Bula remédio:' />

                        <textarea id='bulaRemedio' className='form-textarea' name='bulaRemedio' onChange={this.handleChange} defaultValue={this.state.bulaRemedio}></textarea>
                    </fieldset>

                    <fieldset className='form-group'>
                        < ReactFormLabel htmlFor='valor' title='Valor:' />

                        <input id='valor' className='form-input' name='valor' type="number" step="0.01" min="0" required onChange={this.handleChange} defaultValue={this.state.valor}></input>
                    </fieldset>

                    <div className='form-group'>
                        <input id='formButton' className='btn' type='submit' placeholder='Send message' />
                    </div>
                </form>
            </div>
        )
    }
}


export default ReactForm 