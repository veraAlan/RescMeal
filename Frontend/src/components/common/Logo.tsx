import React from 'react';
import Link from 'next/link';
import { AiOutlineShop } from 'react-icons/ai';

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <div className="flex items-center space-x-1 cursor-pointer group">
                <AiOutlineShop className="text-white text-3xl transition-transform transform group-hover:scale-110" />
            </div>
        </Link>
    );
};

export default Logo;