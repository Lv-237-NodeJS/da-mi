import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getDonor from './donorActions';

export class Donor extends React.Component {

  render() {

    let {is_available} = this.props.donor;
    let abilityTopresent = (is_available == null ||
      is_available) ? 'Yes :)' : 'No :(';
    return (
      <div>
        <h4>Donor info</h4>
        <p><b>Ability to present</b> : {abilityTopresent}</p>
        <p><b>Donors</b>: {this.props.donor.donor}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  donor: state.donor.donor
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(getDonor, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Donor);
