import React from 'react'
import { TagListProps } from '../const/Type';

function TagList({ tags, assign }: TagListProps) {
    return (
        <div className="tag-wrapper">
            {tags.map((tag, index) => {
                return (
                    <div key={index} className="tag" onClick={() => assign(tag.name)}>
                        <div className="tag-name">{tag.name}</div>
                        <div className="tag-count">{tag.count}k</div>
                    </div>
                );
            })}
        </div>
    );
}

export default TagList;