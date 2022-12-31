import React from 'react';

import { UserContextProvider } from '../../../../context/user/user-context';
import CreateUser from './CreateUser';

const IndexUser = () => {

    return (
        <UserContextProvider>
            <CreateUser />
        </UserContextProvider>);
}

export default IndexUser;