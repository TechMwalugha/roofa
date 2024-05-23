import React from 'react';
import { Detector } from 'react-detect-offline';

const CheckInternetConnection = (props: React.PropsWithChildren<{}>) => {
        return (
                <>
                    <Detector
                        render={({ online }) => (
                            online ? props.children: 
                                <div>Please Check Internet Connection</div>
                        ) as React.ReactElement<any, any>} // Add type assertion here
                    />
                </>
        );
};

export default CheckInternetConnection;
