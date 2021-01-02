import React from 'react';

export type Tuple = {
    key: Number,
    value: object
};

export type ViewListProps = {
    paths: string[][]
};

export type ViewProps = {
    path: string[]
};

export type SearchProps = {
    cancel: boolean,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setWriting: React.Dispatch<React.SetStateAction<boolean>>
};