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
                {label: "I need a break...", important: false, like: false, id: 1},
                {label: "Going to learn React", important: false, like: false, id: 2},
                {label: "That is so good", important: false, like: false, id: 3}
            ],
            term: '', // состояние того что вводит пользователь в поиск
            filter: 'all' // состояние как отфильтровать посты
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            // .findIndex - метод сравнения элементов из масива data
            const index = data.findIndex(elem => elem.id === id);

            // создаем новый массив без элемента c id
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

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const oldObject = data[index];
            const newItem = {...oldObject, important: !oldObject.important};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        });
    }

    onToggleLiked(id) {
        this.setState(({data}) => { // ({data}) вместо state.data
            const index = data.findIndex(elem => elem.id === id);
            const oldObject = data[index];
            const newItem = {...oldObject, like: !oldObject.like}; // создаем новый объект и перезаписываем like
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        });
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
           return item.label.indexOf(term) > -1; // сравнение строки поиска (term) с items
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like); // перебор элементов у которых like=true
        } else {
            return items;
        }
    }

    onUpdateSearch(term) { // term - строка поиска
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const liked = this.state.data.filter(item => item.like).length; // Количество лайков
        const allPosts = this.state.data.length; // Количество постов
        // "Двойная фильтрация".
        // searchPost - фильтрует то что пользователь ввел в строку
        // filterPost - фильтруется по заданному фильтру
        const visiblePosts = this.filterPost(this.searchPost(this.state.data, this.state.term), this.state.filter);

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={this.state.filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}