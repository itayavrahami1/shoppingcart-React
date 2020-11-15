import React from 'react'

export function ItemPreview({ item }) {
    return (
        <section className="item-card flex column align-center justify-center" key={item._id}>
            <img src={item.imgURL} alt="" />
            <h2>Name: {item.name}</h2>
            <h2>Price: ${item.price}</h2>
        </section>
    )
}
