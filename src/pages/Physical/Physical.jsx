import React from 'react';
import Logo from '../../shared/Logo';
import PhysicalsBanner from '../../components/PhysicalComponents/PhysicalsBanner';
import PhysicalsFood from '../../components/PhysicalComponents/PhysicalsFood';
import PhysicalsPayment from '../../components/PhysicalComponents/PhysicalsPayment';


const Physical = () => {
    return (
        <div className=' '>
            <Logo />
            <PhysicalsBanner />
            <PhysicalsFood />
            <PhysicalsPayment />
        </div>
    );
};

export default Physical;