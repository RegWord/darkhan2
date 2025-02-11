import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { sendVerificationEmail } from '../../services/userService';
import classes from './profilePage.module.css';

export default function ProfilePage() {
    const {
        user,
        updateProfile
    } = useAuth();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user.name,
            address: user.address,
        },
    });

    const submit = async user => {
        await updateProfile(user);
    };

    const handleVerificationEmail = async () => {
        try {
            await sendVerificationEmail();
            toast.success('Verification email sent! Please check your inbox.');
        } catch (error) {
            toast.error('Failed to send verification email');
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Update Profile" />
                <form onSubmit={handleSubmit(submit)}>
                    <Input
                        defaultValue={user.name}
                        type="text"
                        label="Name"
                        {...register('name', {
                            required: true,
                            minLength: 5,
                        })}
                        error={errors.name}
                    />

                    <Input
                        defaultValue={user.address}
                        type="text"
                        label="Address"
                        {...register('address', {
                            required: true,
                            minLength: 10,
                        })}
                        error={errors.address}
                    />

                    <Button type="submit" text="Update" />
                </form>

                <div className={classes.verificationSection}>
                    <div className={classes.emailStatus}>
                        Email Status: {' '}
                        <span className={user.isEmailVerified ? classes.verified : classes.unverified}>
                            {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                        </span>
                    </div>
                    
                    {!user.isEmailVerified && (
                        <Button
                            onClick={handleVerificationEmail}
                            text="Send Verification Email"
                        />
                    )}
                </div>

                <ChangePassword />
            </div>
        </div>
    );
}
