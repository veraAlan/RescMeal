"use client";

import React from 'react';

const RegisterFoodPage: React.FC = () => {
   return (
      <div>
         <a href='/register/business'>Register Business</a>
         <a href='/register/client'>Register Client</a>
         <a href='/register/carrier' hidden>Register Carrier</a>
      </div>
   );
};

export default RegisterFoodPage;