import React, {useState} from 'react';
import {Tooltip} from 'react-tooltip';
import './HeartDiseasePrediction.css';
import loadingGif from './assets/loading.gif';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';

const HeartDiseasePrediction: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        age: '',
        rbp: '',
        SC: '',
        MHR: '',
        STDep: '',
        gender: 0,
        cpt: 0,
        FBS: 0,
        RECG: 0,
        EIA: 0,
        PEST: 0,
        VesFlo: 0,
        Thal: 0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [networkResponse, setNetworkResponse] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRadioChange = (name: string, value: number) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        ['age', 'rbp', 'SC', 'MHR', 'STDep'].forEach(field => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = `This field is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const final = {
                age: Number(formData.age),
                gender: formData.gender,
                cpt: formData.cpt,
                rbp: Number(formData.rbp),
                SC: Number(formData.SC),
                FBS: formData.FBS,
                RECG: formData.RECG,
                MHR: Number(formData.MHR),
                EIA: formData.EIA,
                STDep: Number(formData.STDep),
                PEST: formData.PEST,
                VesFlo: formData.VesFlo,
                Thal: formData.Thal
            };

            const input_data = [
                final.age, final.gender, final.cpt, final.rbp, final.SC, final.FBS, final.RECG,
                final.MHR, final.EIA, final.STDep, final.PEST, final.VesFlo, final.Thal
            ];
            sendData(input_data);
        }
    };

    const sendData = async (input_data: any) => {
        const resultObject = {
            input_data
        };
        setIsLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5001/predict', resultObject);
            setNetworkResponse(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("1");
            console.error('Error:', error); // Handle the error as needed
            setIsLoading(false);
            enqueueSnackbar('Error: '+error, { variant: 'error' });
        }
    };

    const handleSample = () => {
        setFormData({
            age: '62',
            rbp: '140',
            SC: '268',
            MHR: '160',
            STDep: '3.6',
            gender: 0,
            cpt: 0,
            FBS: 0,
            RECG: 0,
            EIA: 0,
            PEST: 0,
            VesFlo: 2,
            Thal: 2
        });
        setErrors({});
    };

    const handleSample2 = () => {
        setFormData({
            age: '71',
            gender: 0,
            cpt: 0,
            rbp: '112',
            SC: '149',
            FBS: 0,
            RECG: 1,
            MHR: '125',
            EIA: 0,
            STDep: '1.6',
            PEST: 1,
            VesFlo: 0,
            Thal:2
        });
        setErrors({});
    };

    return (
        <div className="container">
            <div className="title-container">
                <h4><b>Heart Disease Prediction System</b></h4>
            </div>
            <div className="form-section">
                <div className="form-field">
                    <label className='bold-gen'>Age <span data-tooltip-id="tooltip-age"
                                                          data-tooltip-content="Enter your age">ⓘ</span></label>
                    <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                        min={1}
                        max={100}
                        onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                    />
                    {errors.age && <span className="error">{errors.age}</span>}
                    <Tooltip id="tooltip-age"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Gender <span data-tooltip-id="tooltip-gender"
                                                             data-tooltip-content="Select your gender">ⓘ</span></label>
                    <div>
                        <span className="radio-margin">
                            <input
                                className="radio-margin"
                                type="radio"
                                checked={formData.gender === 0}
                                onChange={() => handleRadioChange('gender', 0)}
                            /> Female
                        </span>
                        <span className="radio-margin">
                            <input
                                className="radio-margin"
                                type="radio"
                                checked={formData.gender === 1}
                                onChange={() => handleRadioChange('gender', 1)}
                            /> Male
                        </span>
                    </div>
                    <Tooltip id="tooltip-gender"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Chest Pain Type <span data-tooltip-id="tooltip-cpt"
                                                                      data-tooltip-content="Select the type of chest pain">ⓘ</span></label>
                    <div>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.cpt === 0}
                                onChange={() => handleRadioChange('cpt', 0)}
                            /> Typical Angina
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.cpt === 1}
                                  onChange={() => handleRadioChange('cpt', 1)}
                              /> Atypical Angina
                        </span>
                        <span className="radio-margin">
                             <input
                                 type="radio"
                                 checked={formData.cpt === 2}
                                 onChange={() => handleRadioChange('cpt', 2)}
                             /> Non-Anginal Pain
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.cpt === 3}
                                onChange={() => handleRadioChange('cpt', 3)}
                            /> Asymptotic
                        </span>
                    </div>
                    <Tooltip id="tooltip-cpt"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Resting Blood Pressure <span data-tooltip-id="tooltip-rbp"
                                                                             data-tooltip-content="Enter your resting blood pressure">ⓘ</span></label>
                    <input
                        type="number"
                        name="rbp"
                        className="form-control"
                        value={formData.rbp}
                        onChange={handleChange}
                        min={0}
                        onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                    />
                    {errors.rbp && <span className="error">{errors.rbp}</span>}
                    <Tooltip id="tooltip-rbp"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Serum Cholesterol <span data-tooltip-id="tooltip-sc"
                                                                        data-tooltip-content="Enter your serum cholesterol">ⓘ</span></label>
                    <input
                        type="number"
                        name="SC"
                        className="form-control"
                        value={formData.SC}
                        onChange={handleChange}
                        min={0}
                        onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                    />
                    {errors.SC && <span className="error">{errors.SC}</span>}
                    <Tooltip id="tooltip-sc"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Fasting Blood Sugar higher than 120mg/dl? <span
                        data-tooltip-id="tooltip-fbs"
                        data-tooltip-content="Is fasting blood sugar greater than 120mg/dl?">ⓘ</span></label>
                    <div>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.FBS === 0}
                                onChange={() => handleRadioChange('FBS', 0)}
                            /> No
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.FBS === 1}
                                onChange={() => handleRadioChange('FBS', 1)}
                            /> Yes
                        </span>
                    </div>
                    <Tooltip id="tooltip-fbs"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Resting ECG <span data-tooltip-id="tooltip-recg"
                                                                  data-tooltip-content="Select your Resting ECG result">ⓘ</span></label>
                    <div>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.RECG === 0}
                                onChange={() => handleRadioChange('RECG', 0)}
                            /> Normal
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.RECG === 1}
                                onChange={() => handleRadioChange('RECG', 1)}
                            /> Having ST-T wave Abnormality
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.RECG === 2}
                                onChange={() => handleRadioChange('RECG', 2)}
                            /> Left Ventricular Hypertrophy
                        </span>
                    </div>
                    <Tooltip id="tooltip-recg"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Max Heart Rate Achieved <span data-tooltip-id="tooltip-mhr"
                                                                              data-tooltip-content="Enter maximum heart rate achieved">ⓘ</span></label>
                    <input
                        type="number"
                        name="MHR"
                        className="form-control"
                        value={formData.MHR}
                        onChange={handleChange}
                        min={0}
                        onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                    />
                    {errors.MHR && <span className="error">{errors.MHR}</span>}
                    <Tooltip id="tooltip-mhr"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Exercise Induced Angina <span data-tooltip-id="tooltip-eia"
                                                                              data-tooltip-content="Do you have exercise-induced angina?">ⓘ</span></label>
                    <div>
                        <span className="radio-margin"><input
                            type="radio"
                            checked={formData.EIA === 0}
                            onChange={() => handleRadioChange('EIA', 0)}
                        /> No</span>
                        <span className="radio-margin"><input
                            type="radio"
                            checked={formData.EIA === 1}
                            onChange={() => handleRadioChange('EIA', 1)}
                        /> Yes</span>

                    </div>
                    <Tooltip id="tooltip-eia"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>ST Depression Induced by Exercise <span data-tooltip-id="tooltip-stdep"
                                                                                        data-tooltip-content="Enter ST depression induced by exercise relative to rest">ⓘ</span></label>
                    <input
                        type="number"
                        name="STDep"
                        className="form-control"
                        value={formData.STDep}
                        onChange={handleChange}
                        min={0}
                        onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                    />
                    {errors.STDep && <span className="error">{errors.STDep}</span>}
                    <Tooltip id="tooltip-stdep"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Peak Exercise ST Slope <span data-tooltip-id="tooltip-pest"
                                                                             data-tooltip-content="Select the slope of peak exercise ST segment">ⓘ</span></label>
                    <div>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.PEST === 0}
                                onChange={() => handleRadioChange('PEST', 0)}
                            /> Upsloping
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.PEST === 1}
                                onChange={() => handleRadioChange('PEST', 1)}
                            /> Flat
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.PEST === 2}
                                  onChange={() => handleRadioChange('PEST', 2)}
                              /> Downsloping
                        </span>

                    </div>
                    <Tooltip id="tooltip-pest"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Number of Major Vessels Colored by Fluoroscopy <span
                        data-tooltip-id="tooltip-vesflo"
                        data-tooltip-content="Select the number of major vessels colored by fluoroscopy">ⓘ</span></label>
                    <div>
                         <span className="radio-margin">
                             <input
                                 type="radio"
                                 checked={formData.VesFlo === 0}
                                 onChange={() => handleRadioChange('VesFlo', 0)}
                             /> 0
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.VesFlo === 1}
                                onChange={() => handleRadioChange('VesFlo', 1)}
                            /> 1
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.VesFlo === 2}
                                onChange={() => handleRadioChange('VesFlo', 2)}
                            /> 2
                        </span>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.VesFlo === 3}
                                onChange={() => handleRadioChange('VesFlo', 3)}
                            /> 3
                        </span>

                    </div>
                    <Tooltip id="tooltip-vesflo"/>
                </div>

                <div className="form-field">
                    <label className='bold-gen'>Thalassemia <span data-tooltip-id="tooltip-thal"
                                                                  data-tooltip-content="Select your Thalassemia status">ⓘ</span></label>
                    <div>
                        <span className="radio-margin">
                            <input
                                type="radio"
                                checked={formData.Thal === 0}
                                onChange={() => handleRadioChange('Thal', 0)}
                            /> 1
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.Thal === 1}
                                  onChange={() => handleRadioChange('Thal', 1)}
                              /> 2
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.Thal === 2}
                                  onChange={() => handleRadioChange('Thal', 2)}
                              /> 3
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.Thal === 3}
                                  onChange={() => handleRadioChange('Thal', 3)}
                              /> 4
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.Thal === 4}
                                  onChange={() => handleRadioChange('Thal', 4)}
                              /> 5
                        </span>
                        <span className="radio-margin">
                              <input
                                  type="radio"
                                  checked={formData.Thal === 5}
                                  onChange={() => handleRadioChange('Thal', 5)}
                              /> 6
                        </span>
                    </div>
                    <Tooltip id="tooltip-thal"/>
                </div>


                <button className="submitBtn bold-gen" onClick={handleSubmit}>Check Status</button>
                <div className='fill-btn-container'>
                    <label onClick={handleSample}>Fill Sample</label>
                </div>
                <div className='fill-btn-container'>
                    <label onClick={handleSample2}>Fill Sample 2</label>
                </div>
            </div>

            {isLoading &&
                <div className="loading-container">
                    <img src={loadingGif} alt="Loading..." width="70px"/>
                </div>
            }

            {(networkResponse && networkResponse.prediction === 'The person does not have heart disease') &&
                <div className="result-section-healthy">
                    <h2>Result</h2>
                    <p>This Person has Healthy Heart 😊</p>
                </div>
            }

            {(networkResponse && networkResponse.prediction === 'The person has heart disease') &&
                <div className="result-section-unhealthy">
                    <h2>Result</h2>
                    <p>This Person has Unhealthy Heart 😔</p>
                </div>
            }
        </div>
    );
};

export default HeartDiseasePrediction;
