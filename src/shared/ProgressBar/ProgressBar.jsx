import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const ProgressBars = ({ value }) => {
    return (
        <div>
            <ProgressBar completed={value ? value : 10} ></ProgressBar>
        </div>
    );
}

export default ProgressBars;