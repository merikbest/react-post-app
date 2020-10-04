import React, {Component} from "react";
import "./post-status-filter.css";

export default class PostStatusFilter extends Component {

    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ]
    }

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            // отрисовывание активной кнопки
            const active = this.props.filter === name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button
                    key={name} // key={name} - уникальный ключ, иначе реакт выдаст ошибку
                    type="button"
                    className={`btn ${clazz}`}
                    onClick={() => this.props.onFilterSelect(name)} // подсветка активной кнопки
                >{label}</button>
            )
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}