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
    setTag: React.Dispatch<React.SetStateAction<string>>,
    setCancel: React.Dispatch<React.SetStateAction<boolean>>
};