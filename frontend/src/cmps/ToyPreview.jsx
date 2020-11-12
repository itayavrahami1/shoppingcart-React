import React from 'react'

export function ToyPreview({ toy }) {
    return (
        <section className="toy-card flex column align-center justify-center" key={toy._id}>
            <img src={toy.imgUrl} alt="" />
            <h2>Name: {toy.name}</h2>
        </section>
    )
}
