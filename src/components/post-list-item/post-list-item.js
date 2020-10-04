import React, {Component} from "react";
import "./post-list-item.css";

export default class PostListItem extends Component {

/*    constructor(props) {
        super(props);
        this.state = { // состояние компонента
            important: false,
            like: false
        };

        this.onImportant = this.onImportant.bind(this); // привязываем обработчик
        this.onLike = this.onLike.bind(this);
    }*/

/*    // Когда кликаем на кнопку вызывается метод onImportant()
    onImportant() {
        // изменить состояние компонента (из конструктора)
        this.setState(({important}) => ({
            important: !important // true
        }));
    }

    onLike() {
        this.setState(({like}) => ({
            like: !like
        }));
    }*/

    render() { // метод отрисовывает класс на странице
        const {label, onDelete, onToggleImportant, onToggleLiked, important, like} = this.props; // {...itemProps} и onDelete из post-list.js
        // const {important, like} = this.state; // вытаскиваем important из state

        let classNames = "app-list-item d-flex justify-content-between";

        if (important) {
            classNames += " important";
        }

        if (like) {
            classNames += " like";
        }

        return (
            <div className={classNames}>
            <span
                className="app-list-item-label"
                onClick={onToggleLiked}>
                {label}
            </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-star btn-sm"
                        onClick={onToggleImportant}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        // onDelete берем из переданных "пропсов"
                        onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}