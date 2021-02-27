import React from 'react'

import classNames from 'classnames';
import index from '../../static/css/index.module.css';
import tagList from '../../static/css/tagsearch/tagList.module.css';

type Tag = {
    name: string,
    count: number
};

type TagListProps = {
    tagListProp: Tag[],
    isWritten: boolean,
    assignKeyword: (tag: string) => void
};

function TagList({
    tagListProp,
    isWritten,
    assignKeyword }: TagListProps) {

    return (
        <>
            <div className={tagList.dotWrapper}>
                <div className={isWritten ? classNames([tagList.dot, index.fadeInFast]) : index.nonDisplay}>
                    ●
                </div>
            </div>
            <div className={tagList.tagWrapper}>
                {tagListProp.map((tag, key) => {
                    return (
                        <div key={key} className={tagList.tag} onClick={() => assignKeyword(tag.name)}>
                            <div className={tagList.tagName}>
                                {tag.name}
                            </div>
                            <div className={tagList.tagCount}>
                                {tag.count}K
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default TagList;