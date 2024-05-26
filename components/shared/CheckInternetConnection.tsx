import React from 'react';

const CheckInternetConnection = (props: React.PropsWithChildren<{}>) => {
    const [online, setOnline] = React.useState(navigator.onLine);

    React.useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            {online ? props.children : <div>Please Check Internet Connection</div>}
        </>
    );
};

export default CheckInternetConnection;
