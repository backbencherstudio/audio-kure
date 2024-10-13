import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import logo from "./../../assets/images/logo.png"
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
const ProgressBars = ({ value }) => {
    return (
        <div>
            <div className='flex items-center justify-evenly'>
                <div>
                    <Link className='flex items-center gap-5'><GrLinkPrevious ></GrLinkPrevious > Back</Link>
                </div>
                <div>
                    <img src={logo} alt="" />
                </div>
                <div> </div>
            </div>
            <ProgressBar className='bg-transparent'
                completed={value ? value : 10}
                labelColor="transparent"
                labelAlignment="center"
            />
        </div>
    );
}

export default ProgressBars;
