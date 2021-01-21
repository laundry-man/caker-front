import React from 'react';

export type Tag = {
    name: string,
    count: number
};

export type TagViewListProps = {
    pathList: string[],
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

export type TagViewProps = {
    path: string,
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}

export type ViewListProps = {
    pathList: string[][]
};

export type ViewProps = {
    path: string[]
};

export type ActiveViewProps = {
    path: string
}

export type ImageViewProps = {
    path: string
}

export type ActiveImageViewProps = {
    innerElement: JSX.Element
}

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

export type ResultProps = {
    tag: string,
    redirect: (path: string) => void
}

export type UploadProps = {
    redirect: (path: string) => void,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPredecessor: React.Dispatch<React.SetStateAction<string>>
}