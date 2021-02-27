import React, { useEffect } from 'react';

import { Page, ENTRANCE } from '../../const/Constant';

import entrace from '../../static/css/entrance.module.css';

type EntranceProps = {
    pageDidMount: (page: Page) => void
};

function Entrance({ pageDidMount }: EntranceProps) {
    useEffect(() => {
        pageDidMount(ENTRANCE);
    }, []);

    return (
        <div></div>
    );
}

export default Entrance;