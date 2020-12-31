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
    tag: string,
    setTag: React.Dispatch<React.SetStateAction<string>>
};