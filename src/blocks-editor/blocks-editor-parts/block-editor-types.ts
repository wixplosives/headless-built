import React from 'react';

export interface BlockEditor {
    icon: React.ReactNode;
    title: string;
    description: string;
    defaultData?: Record<string, any>;
}
