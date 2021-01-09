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
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
};

export type MainProps = {
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

export type TagViewListProps = {
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

export type TagViewProps = {
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

export type ResultProps = {
    tag: string,
    redirect: (path: string) => void
}