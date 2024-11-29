import React from 'react';
import { FaJava } from 'react-icons/fa'; // Java icon
import { SiSpringboot, SiTypescript, SiTailwindcss } from 'react-icons/si'; // Spring Boot, TypeScript, and Tailwind CSS icons
import { RiNextjsLine } from 'react-icons/ri'; // Next.js icon

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-500 text-white p-4 mt-8 shadow-inner">
            <div className="container mx-auto text-center">
                <div className="flex justify-center items-center space-x-4">
                    <FaJava className="text-2xl" title="Java" />
                    <SiSpringboot className="text-2xl" title="Spring Boot" />
                    <span>Programado en</span>
                    <RiNextjsLine className="text-2xl" title="Next.js" />
                    <SiTypescript className="text-2xl" title="TypeScript" />
                    <SiTailwindcss className="text-2xl" title="Tailwind CSS" />
                </div>
                <p className="mt-2">Backend: Java + Spring | Frontend: Next.js + TypeScript + Tailwind CSS</p>
            </div>
        </footer>
    );
};

export default Footer;