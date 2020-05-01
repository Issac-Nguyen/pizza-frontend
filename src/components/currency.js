import React, {Fragment} from 'react';
import {connect} from 'react-redux'

export const Currency = ({usd, eur, showCurrency, showFull}) => {
    console.log('usd', usd)
    console.log('eur', eur)
    console.log('showCurrency', showCurrency)
    const fullTextCurrency = (usd && eur) ? showCurrency == 'usd' ? `$${usd} (EUR ${eur})` : `EUR ${eur} ($${usd})` : '';
    console.log(fullTextCurrency)
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