"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { Description } from "@radix-ui/react-dialog";

const services = [
    {
        num: '01',
        title: 'Web Development',
        description: 'I develop responsive websites using modern technologies like React, Next.js, and Tailwind CSS.',
        href: ""
    },
    {
        num: '02',
        title: 'UI/UX Design',
        description: 'I create intuitive and visually appealing user interfaces and experiences.',
        href: ""
    },
    {
        num: '03',
        title: 'Video Editing',
        description: 'I edit and produce high-quality videos for various platforms and purposes.',
        href: ""
    }
    ,{
        num: '04',
        title: 'SEO',
        description: 'I optimize websites for search engines to improve visibility and ranking.',
        href: ""
    }
]

const Services = () => {
    return (
        <div className="container mx-auto">Services Page</div>
    );
}

export default Services;