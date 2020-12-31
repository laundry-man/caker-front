import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';

function Search() {
    return (
        <div className="fade-in-fast">
            <InputBase style={{fontFamily: 'Noto Sans KR', color: '#333333', fontWeight: 'bold'}} defaultValue="keep going, don't settled" fullWidth></InputBase>
        </div>
    );
}

export default Search;