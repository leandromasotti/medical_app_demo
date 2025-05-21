import React from 'react';
import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
}

/**
 * A reusable component for displaying error states
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request. Please try again later.',
  actionText = 'Go back to home',
  actionLink = '/',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-red-500 text-5xl mb-6">⚠️</div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-8 max-w-md">{message}</p>
      <Link href={actionLink} className="btn btn-primary">
        {actionText}
      </Link>
    </div>
  );
};

export default ErrorState;
