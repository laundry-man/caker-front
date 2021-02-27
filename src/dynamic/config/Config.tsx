import React, { useState, useEffect } from 'react';

import { Page, CONFIG } from '../../const/Constant';

import config from '../../static/css/config.module.css';

type ConfigProps = {
    pageDidMount: (page: Page) => void
}

function Config({ pageDidMount }: ConfigProps) {

    useEffect(() => {
        pageDidMount(CONFIG);
    }, []);

    return (
        <div />
    );
}

export default Config;