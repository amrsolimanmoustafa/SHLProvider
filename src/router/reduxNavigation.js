import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './appNavigation'

// here is our redux-aware smart component
// function ReduxNavigation (props) {
//   const { dispatch, nav } = props
//   const navigation = ReactNavigation.addNavigationHelpers({
//     dispatch,
//     state: nav
//   })

//   return <AppNavigation navigation={navigation} />
// }

// const mapStateToProps = state => ({ nav: state.nav })
// export default connect(mapStateToProps)(ReduxNavigation)
function ReduxNavigation(props) {
  // const { dispatch, nav } = props;
  const navigation = ReactNavigation.addNavigationHelpers({
    // dispatch,
    // state: nav
  });

  return <AppNavigation />;
}

// const mapStateToProps = state => ({ nav: state.nav });
export default ReduxNavigation;
