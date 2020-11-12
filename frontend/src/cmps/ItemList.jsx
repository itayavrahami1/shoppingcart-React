import React from 'react'
import { ToyPreview } from "./ToyPreview";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export function ItemList({ items }) {
    console.log('list', items);
    return (<div>{items.map(item => { return <h4 key="item.id">{item.name}</h4> })}</div>)
    // return (<ul className="toys-list flex grid card-grid">
    //     {toys.map(toy => {
    //         return <li key={toy._id}>
    //             <ToyPreview toy={toy} />
    //             <Button variant="contained" color="primary" className="toy-details-btn" >
    //                 <Link to={`/toy/${toy._id}`}>Details</Link>
    //             </Button>
    //         </li>
    //     })}
    // </ul>)
}

