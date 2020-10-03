import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import "./app.css";

export default class App extends Component {

    constructor(props) {
        super(props);
        // state изменять нельзя. А именно data:
        this.state = {
            //Эмуляция данных "с сервера"
            data: [
                {label: "I need a break...", important: false, id: 1},
                {label: "Going to learn React", important: false, id: 2},
                {label: "That is so good", important: false, id: 3}
            ]
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            // .findIndex - метод сравнения элементов из масива data
            const index = data.findIndex(elem => elem.id === id);

            // создаем новый масив без елемента c id
            const newArray = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArray
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArray = [...data, newItem];

            return {
                data: newArray
            }
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}