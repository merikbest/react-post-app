import React, {Component} from "react";
import "./post-add-form.css";

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // получение значений из инпута
    onValueChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    onSubmit(event) {
        // отменить стандартное поведение браузера
        // т.к. после подтверждения будет обновляться страница
        event.preventDefault();
        // .onAdd() - проперти из app.js
        this.props.onAdd(this.state.text) // this.state.text - текст введенный пользователем
        this.setState({
           text: '' // отчистка поля
        });
    }

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onValueChange} // функция отслеживает что ввел пользователь и записывать в state
                    value={this.state.text} // обратная связь между элементом input и state (для того что бы очищать input после отправки)
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить
                </button>
            </form>
        )
    }
}