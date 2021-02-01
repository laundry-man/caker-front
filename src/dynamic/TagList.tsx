import React from 'react'
import { TagListProps } from '../const/Type';

function TagList({ tags, inverse, writing, assign }: TagListProps) {
    return (
        <>
            <div className="dot-wrapper">
                <div className={writing ? inverse ? "inverse-dot fade-in-fast" : "dot fade-in-fast" : "invisible"}>●</div>
            </div>
            <div className="tag-wrapper">
                {tags.map((tag, index) => {
                    return (
                        <div key={index} className="tag" onClick={() => assign(tag.name)}>
                            <div className={inverse ? "inverse-tag-name" : "tag-name"}>{tag.name}</div>
                            <div className="tag-count">{tag.count}K</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default TagList;