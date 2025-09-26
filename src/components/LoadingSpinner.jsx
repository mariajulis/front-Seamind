export const LoadingSpinner = ({ size = 'md' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
    };

    return (
        <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizes[size]}`} />
    );
};