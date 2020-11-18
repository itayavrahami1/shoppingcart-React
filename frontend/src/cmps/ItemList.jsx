import React from 'react'
import { ItemPreview } from "./ItemPreview";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export function ItemList({ items, cls }) {
    return (<ul className={`items-list clean-list ` + cls}>
        {items.map(item => {
            return <li key={item._id}>
                <ItemPreview item={item} />
                <Button variant="contained" color="primary" className="item-details-btn" >
                    <Link to={`/${item._id}`}>Details</Link>
                </Button>
            </li>
        })}
    </ul>)
}

