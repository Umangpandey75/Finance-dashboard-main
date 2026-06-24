import React from 'react';
import { Shield, Eye } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RoleBase = ({ onClose }) => {
  const { role, setRole } = useAppContext();

  const handleRole = (newRole) => {
    setRole(newRole);
    if (onClose) onClose();
  };

  return (
    <div className="p-3">
      {[
        { value: 'viewer', label: 'Viewer', icon: Eye },
        { value: 'admin', label: 'Admin', icon: Shield },
      ].map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => handleRole(value)}
          className={`w-full flex items-center gap-2 px-3 py-3 transition-colors ${
            role === value
              ? 'bg-blue-200 dark:bg-blue-900/30 text-blue-700 dark:text-blue-500 rounded-lg'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg hover:text-blue-600 dark:hover:text-blue-500'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="lg:text-sm text-xs font-medium">{label}</span>
          {role === value && (
            <span className="ml-auto w-2 h-2 rounded-full bg-blue-500" />
          )}
        </button>
      ))}
    </div>
  );
};

export default RoleBase;
