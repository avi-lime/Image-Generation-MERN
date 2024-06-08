import React from 'react'
import { Link } from 'react-router-dom'
import './HistoryCard.css'
const HistoryCard = (props) => {
    const item = props.item
    return (
        <article class="card">
            <div class="card-img">
                <img src={item.imageUrl} class="card-imgs pv"></img>
            </div>

            <div class="project-info">
                <div class="flex">
                    <div class="project-title">{item.query}</div>
                    <span class="tag">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </article>

    )
}

export default HistoryCard