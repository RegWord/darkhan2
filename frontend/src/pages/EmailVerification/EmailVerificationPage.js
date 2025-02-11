import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import classes from './emailVerification.module.css';

export default function EmailVerificationPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const { updateUserData } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setVerificationStatus('Invalid verification link');
            return;
        }

        verifyEmail(token)
            .then(async () => {
                setVerificationStatus('Email verified successfully!');
                await updateUserData();
                setTimeout(() => navigate('/profile'), 2000);
            })
            .catch(() => {
                setVerificationStatus('Verification failed. Please try again.');
            });
    }, []);

    return (
        <div className={classes.container}>
            <h2>{verificationStatus}</h2>
        </div>
    );
} 