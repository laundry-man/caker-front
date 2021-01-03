import React from 'react'
import { TagListProps } from '../const/Types';

function TagList({ tags }: TagListProps) {
    return (
        <div className="tag-wrapper">
            {tags.map((tag, index) => {
                return <div key={index}>{tag.name}</div>
            })}
        </div>
    );
}

export default TagList;