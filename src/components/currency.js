import React, {Fragment} from 'react';
import {connect} from 'react-redux'

export const Currency = ({usd, eur, showCurrency, showFull}) => {
    const fullTextCurrency = (usd && eur) ? showCurrency == 'usd' ? `$${usd} (EUR ${eur})` : `EUR ${eur} ($${usd})` : '';
    return(  <Fragment>
            {!showFull && <>
                {showCurrency == 'usd' && (usd ? `$${usd}` : '')}
                {showCurrency == 'eur' && (eur ? `EUR ${eur}` : '')}
            </>}
            {!!showFull && <>
                {fullTextCurrency}
            </>}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    showCurrency: state.showCurrency
})

export default connect(mapStateToProps)(Currency);