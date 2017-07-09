import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as giftActions from '../../redux/gift';
import { GiftList, AddGift } from 'src/containers';

class Gift extends React.Component {
  componentWillMount() {
    const {id, actions} = this.props;
    actions.fetchGifts(id);
  }

  render() {
    return (
      <div>
        <AddGift id={this.props.id} actions={this.props.actions} gifts={this.props.gifts}/>
        <GiftList id={this.props.id} actions={this.props.actions} gifts={this.props.gifts}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gifts: state.gift.gifts
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(giftActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Gift);
