import React from 'react';

export type Tag = {
    name: string,
    count: number
};

export type ViewListProps = {
    paths: string[][]
};

export type ViewProps = {
    path: string[]
};

export type TagListProps = {
    tags: Tag[],
    assign: (tag: string) => void
};

export type SearchProps = {
    cancel: boolean,
    writing: boolean,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setWriting: React.Dispatch<React.SetStateAction<boolean>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
};

export type MainProps = {
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

export type ResultProps = {
    tag: string
}