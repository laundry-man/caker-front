import React from 'react';

export type ViewListProps = {
    paths: string[][]
};

export type ViewProps = {
    path: string[]
};

export type Tag = {
    name: string,
    path: string
};

export type TagListProps = {
    tags: Tag[]
};

export type SearchProps = {
    cancel: boolean,
    writing: boolean,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setWriting: React.Dispatch<React.SetStateAction<boolean>>
};