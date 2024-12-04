import React, { useState, useEffect } from 'react';
import ProgressBars from '../../shared/ProgressBar/ProgressBar';
import { Link } from 'react-router-dom';

const Weight = () => {
    const [unit, setUnit] = useState('LB');
    const [currentWeight, setCurrentWeight] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedData = localStorage.getItem('weightData');
        if (savedData) {
            const { unit: savedUnit, current, target } = JSON.parse(savedData);
            setUnit(savedUnit);
            setCurrentWeight(current);
            setTargetWeight(target);
        }
    }, []);

    useEffect(() => {
        if (currentWeight || targetWeight) {
            localStorage.setItem('weightData', JSON.stringify({
                unit,
                current: currentWeight,
                target: targetWeight
            }));
        }
    }, [unit, currentWeight, targetWeight]);

    const convertWeight = (value, from, to) => {
        if (!value) return '';
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return value;

        if (from === 'LB' && to === 'KG') {
            return (numValue * 0.453592).toFixed(1);
        } else if (from === 'KG' && to === 'LB') {
            return (numValue * 2.20462).toFixed(1);
        }
        return value;
    };

    const handleUnitChange = (newUnit) => {
        if (newUnit !== unit) {
            setCurrentWeight(convertWeight(currentWeight, unit, newUnit));
            setTargetWeight(convertWeight(targetWeight, unit, newUnit));
            setUnit(newUnit);
        }
    };

    const handleTargetWeightChange = (e) => {
        const newTargetWeight = e.target.value;
        const currentWeightNum = parseFloat(currentWeight);

        if (currentWeightNum && parseFloat(newTargetWeight) >= currentWeightNum) {
            setError('Target weight must be less than current weight.');
        } else {
            setError('');
        }

        setTargetWeight(newTargetWeight);
    };

    const isNextButtonDisabled = !currentWeight || !targetWeight || error;

    return (
        <div>
            <ProgressBars page={7} value={100}></ProgressBars>
            <div className='text-center max-w-lg mx-auto mt-6'>
                <h1 className='text-3xl'>What’s your current weight and target weight?</h1>
                <p>This will help us tailor a program specifically for you. More than 90% of Kure users reach their target weight.</p>
            </div>
            <div className="max-w-md mx-auto p-6 space-y-6">

                {/* Unit Toggle */}
                <div className="flex rounded-lg overflow-hidden border border-gray-600">
                    <button
                        className={`flex-1 py-2 px-4 ${unit === 'LB' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-300'}`}
                        onClick={() => handleUnitChange('LB')}
                    >
                        LB
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 ${unit === 'KG' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-300'}`}
                        onClick={() => handleUnitChange('KG')}
                    >
                        KG
                    </button>
                </div>

                {/* Weight Inputs */}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Current weight"
                            value={currentWeight}
                            required
                            onChange={(e) => setCurrentWeight(e.target.value)}
                            className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="absolute right-3 top-3 text-gray-400">
                            {unit.toLowerCase()}
                        </span>
                    </div>

                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Goal weight"
                            value={targetWeight}
                            required
                            onChange={handleTargetWeightChange}
                            className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="absolute right-3 top-3 text-gray-400">
                            {unit.toLowerCase()}
                        </span>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>

                {/* Next Button */}
                <Link to='/email'>
                    <button
                        className={`w-full py-3 px-4 ${isNextButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-teal-500'} text-white rounded-lg mt-5`}
                        disabled={isNextButtonDisabled}
                    >
                        Next
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Weight;
