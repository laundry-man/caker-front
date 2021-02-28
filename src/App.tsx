import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Page, GEO_TAG_SEARCH } from './const/Constant';

import Entrance from './dynamic/Entrance';
import Frame from './dynamic/Frame';

function App() {
    const [isSigned, setIsSigned] = useState(false);

    const pageHistory = useHistory<Page>();

    useEffect(() => {
        if (isSigned)
            pageHistory.push(GEO_TAG_SEARCH);
    }, [isSigned]);

    return (
        <>
            {isSigned ? 
                <Frame /> : 
                <Entrance setIsSigned={setIsSigned} />
            }
        </>
    );
}

export default App;