import React from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import "./app.css";

const App = () => {

    //Эмуляция данных "с сервера"
    const data = [
        {label: "I need a break...", important: true, id: "1"},
        {label: "Going to learn React", important: false, id: "2"},
        {label: "That is so good", important: false, id: "3"}
    ]

    return (
        <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList posts={data} />
            <PostAddForm/>
        </div>
    )
}

export default App;