import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { updateUser } from '../../redux/user/operations';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import css from './DailyNormaModal.module.css';
import { IoClose } from 'react-icons/io5';

const schema = yup.object().shape({
    weight: yup.number().typeError('Please, enter a number').min(0).max(300).required('Weight is required'),
    dailyTimeActivity: yup.number().typeError('Please, enter a number').min(0).max(8).required('Active sport time is required'),
    todayWater: yup.number().typeError('Please, enter a number').min(0).max(10).required('Daily water intake is required'),
});

const DailyNormaModal = ({ onClose }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const formatNumber = (num) => {
        if (isNaN(num)) return '';
        return num.toFixed(1);
    };

    const [manualWaterNorm, setManualWaterNorm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch, getValues } = useForm({
        defaultValues: { weight: user.weight, dailyTimeActivity: user.dailyTimeActivity, todayWater: user.todayWater, gender: user.gender },
        resolver: yupResolver(schema),
    });

    const watchFields = watch(['weight', 'dailyTimeActivity', 'gender']);

    const calculateNormaWater = (userGender, userWeight, userSportTime) => {
        let normaWater = 2;
        if (userWeight > 0 && userSportTime >= 0) {
            if (userGender === 'female') {
                normaWater = Math.ceil((userWeight * 0.03 + userSportTime * 0.4) * 100) / 100;
            } else if (userGender === 'male') {
                normaWater = Math.ceil((userWeight * 0.04 + userSportTime * 0.6) * 100) / 100;
            }
        }
        return normaWater;
    };

    useEffect(() => {
        reset({ weight: user.weight, dailyTimeActivity: user.dailyTimeActivity, todayWater: user.todayWater, gender: user.gender });
        setManualWaterNorm('');
        setIsEditing(false);
    }, [reset, user.weight, user.dailyTimeActivity, user.todayWater, user.gender]);

    useEffect(() => {
        if (watchFields[0] && watchFields[1] && !isEditing) {
            const calculatedNormaWater = calculateNormaWater(watchFields[2], watchFields[0], watchFields[1]);
            const formattedValue = formatNumber(calculatedNormaWater);
            setValue('todayWater', parseFloat(formattedValue));
            setManualWaterNorm(formattedValue);
        }
    }, [watchFields, setValue, isEditing]);

    const onSubmit = async (data) => {
        const { weight: newWeight, dailyTimeActivity: newActivity, gender: newGender, todayWater: newTodayWater } = getValues();
        const hasChanges = user.weight !== newWeight || user.dailyTimeActivity !== newActivity || user.gender !== newGender || user.todayWater !== newTodayWater;

        try {
            if (!user._id) {
                throw new Error("User ID is missing");
            }

            const waterRateInMilliliters = parseFloat(manualWaterNorm) * 1000;

            console.log({
                _id: user._id,
                weight: newWeight,
                dailyTimeActivity: newActivity,
                gender: newGender,
                waterRate: waterRateInMilliliters || 0, // Відправляємо норму води в мілілітрах
                todayWater: parseFloat(newTodayWater) * 1000 || 0, // Відправляємо щоденне споживання води в мілілітрах
            });

            const updateUserPromise = hasChanges
                ? dispatch(updateUser({
                    _id: user._id,
                    weight: newWeight,
                    dailyTimeActivity: newActivity,
                    gender: newGender,
                    waterRate: waterRateInMilliliters || 0,
                    todayWater: parseFloat(newTodayWater) * 1000 || 0, // Зберігаємо дані в мілілітрах
                })).unwrap()
                : Promise.resolve();

            await updateUserPromise;

            toast.success('The changes were successfully applied!');
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to apply changes!');
        }
    };

    return (
        <Modal open={true} onClose={onClose} aria-labelledby="modal-title">
            <Box className={css.modalStyle}>
                <div className={css.modalContainer}>
                    <div className={css.dailyCloseContainer}>
                        <h3 className={css.title}>My daily norma</h3>
                        <button onClick={onClose} className={css.iconClose}>
                            <IoClose />
                        </button>
                    </div>

                    <div className={css.formulaContainer}>
                        <div className={css.formulaTitleContainer}>
                            <h4 className={css.formulaTitle}>For girl: </h4>
                            <p className={css.formula}>V=(M*0.03) + (T*0.4)</p>
                        </div>
                        <div className={css.formulaTitleContainer}>
                            <h4 className={css.formulaTitle}>For man: </h4>
                            <p className={css.formula}>V=(M*0.04) + (T*0.6)</p>
                        </div>
                    </div>

                    <div className={css.containerFormulaDescription}>
                        <p className={css.formulaDescription}>
                            <span>*</span> V is the volume of the water norm in liters per day,
                            M is your body weight, T is the time of active sports, or another type
                            of activity commensurate in terms of loads (in the absence of these, you must set 0)
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={css.container}>
                            <h2 className={css.formTitle}>Calculate your rate:</h2>
                            <div className={css.genderContainer}>
                                <label className={css.radioLabel}>
                                    <input
                                        className={css.radio}
                                        type="radio"
                                        value="female"
                                        {...register('gender')}
                                        defaultChecked={user.gender === 'female'}
                                    />
                                    <span className={css.checkmark}></span>
                                    For woman
                                </label>
                                <label className={css.radioLabel}>
                                    <input
                                        className={css.radio}
                                        type="radio"
                                        value="male"
                                        {...register('gender')}
                                        defaultChecked={user.gender === 'male'}
                                    />
                                    <span className={css.checkmark}></span>
                                    For man
                                </label>
                            </div>

                            <label className={css.label}>
                                Your weight in kilograms:
                                <input
                                    placeholder='0'
                                    type="number"
                                    step="any"
                                    {...register('weight')}
                                    className={`${css.inputField} ${errors.weight ? css.error : ''}`}
                                />
                                {errors.weight && <p className={css.errorText}>{errors.weight.message}</p>}
                            </label>

                            <label className={css.label}>
                                Time of active participation in sports (hours):
                                <input
                                    placeholder='0'
                                    type="number"
                                    step="any"
                                    {...register('dailyTimeActivity')}
                                    className={`${css.inputField} ${errors.dailyTimeActivity ? css.error : ''}`}
                                />
                                {errors.dailyTimeActivity && <p className={css.errorText}>{errors.dailyTimeActivity.message}</p>}
                            </label>

                            <div className={css.resultContainer}>
                                <p className={css.resultText}>The required amount of water in liters per day: </p>
                                <span className={css.resultValue}>{manualWaterNorm || '2.0'} L</span>
                            </div>

                            <label className={css.labelNorma}>
                                Write down how much water you will drink:
                                <input
                                    placeholder='0'
                                    type="number"
                                    step="any"
                                    value={manualWaterNorm}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*\.?\d*$/.test(value)) {
                                            const parsedValue = parseFloat(value) || '';
                                            setManualWaterNorm(parsedValue);
                                            setIsEditing(true);
                                            setValue('todayWater', parsedValue);
                                        }
                                    }}
                                    onBlur={() => setIsEditing(false)}
                                    className={`${css.inputField} ${errors.todayWater ? css.error : ''}`}
                                />
                                {errors.todayWater && <p className={css.errorText}>{errors.todayWater.message}</p>}
                            </label>
                        </div>
                        <div className={css.containerButton}>
                            <button type="submit" className={css.saveButton}>Save</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default DailyNormaModal;
