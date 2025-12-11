import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {

    const [show, setShow] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout
            footer={
                <div className="card-footer text-center">
                    <div className="small"><Link className='text-primary' href={route('register')}>Need an account? Sign up!</Link></div>
                </div>
            }
        >
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='text-center'>

                <form onSubmit={submit}>
                    <div className='mb-3'>

                        <InputLabel htmlFor="email" value="Email Address" />
                        
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter Email Address"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-3 ">
                        <InputLabel htmlFor="password" value="Password" />
                        <div className='relative'>
                            <TextInput
                                id="password"
                                type={show ? "text" : "password"}
                                name="password"
                                value={data.password}
                                placeholder="Enter Password"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <div className='!absolute !-translate-y-2/4 !m-0 !top-2/4 right-3 cursor-pointer' onClick={() => {setShow(!show)}}>
                                {
                                    show ? (
                                        <EyeSlashIcon className='w-6 h-6' />
                                    ) : (
                                        <EyeIcon className='w-6 h-6' />
                                    )
                                }
                            </div>
                        </div>

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex align-items-center justify-between mb-3">
                        <div className="form-check !text-[#69707a]">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            Remember Me
                        </div>
                        <div>

                        </div>
                    </div>

                    <div className="flex place-content-center items-center justify-content-between mb-0">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="small text-primary"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>


        </GuestLayout>
    );
}
