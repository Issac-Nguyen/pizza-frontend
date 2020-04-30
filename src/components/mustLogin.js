import React from 'react';
export {connect} from 'react-redux'

export const MustLogin = (props) => {
    return (
        <h1>You need to login to see this feature</h1>
    )
}

export default MustLogin