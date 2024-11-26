import React from 'react';
import Link from 'next/link';
import { SiNextdotjs } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { AiOutlinePlus } from 'react-icons/ai';

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <div className="flex items-center space-x-1 cursor-pointer group">
                <DiJava className="text-white text-3xl transition-transform transform group-hover:scale-110" />
                <AiOutlinePlus className="text-white text-2xl mx-1" />
                <SiNextdotjs className="text-white text-3xl transition-transform transform group-hover:scale-110" />
            </div>
        </Link>
    );
};

export default Logo;