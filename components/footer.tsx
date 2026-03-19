'use client';

import { ShoppingCart, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/costants';

const Footer = () => {
const currentYear = new Date().getFullYear();


  return (
    <footer className=" border-t">
      <div className="p-5 flex-center">
        {currentYear} {APP_NAME}. All rights reserved.
        </div>
    
    </footer>
  );
};

export default Footer;
