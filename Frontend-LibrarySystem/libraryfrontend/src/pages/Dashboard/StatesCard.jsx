import React from 'react';
import { Card, CardContent } from '@mui/material';

const StatesCard = ({bgColor, icon, value, title, subtitle, textColor}) => {
  return (
    <Card>
        <CardContent>
            <div className='flex items-center justify-between mb-4'>
                {/* Changed single quotes to backticks for proper string interpolation */}
                <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
                <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
            </div>

            <p className="text-gray-700 font-semibold mb-1">{title}</p>
            {/* Removed the stray 'p' character before the span */}
            <span className="text-gray-500 text-sm">{subtitle}</span>
        </CardContent>
    </Card>
  );
}

export default StatesCard;