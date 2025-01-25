import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        // <!-- Footer -->
        <footer className='bg-gray-200 py-4 mt-24'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
                <div className='mb-4 md:mb-0'>
                    {/* <p className='justify-center text-sm text-gray-500 mt-2 md:mt-0'>
                        This is a work in progress! I subscribe to the CI/CD lifestyle and you can find more up to date versions on my github.
                    </p> */}
                </div>
                    
            </div>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
                <div className='mb-4 md:mb-0'>
                    <Image
                        src={logo}
                        alt='Logo'
                        className='h-8 w-auto'
                    />
                    <Link href={'https://github.com/sherKuo/property-pulse'}><FaGithub className='inline mr-2'></FaGithub>
                    </Link>
                    
                </div>

                <div>
                    <p className='text-sm text-gray-500 mt-2 md:mt-0'>
                        &copy; {currentYear} PropertyPulse. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
