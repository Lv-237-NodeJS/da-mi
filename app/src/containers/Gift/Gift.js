import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as giftActions from './giftActions';
import { GiftList, AddGift } from 'src/containers';

class Gift extends React.Component {
  componentWillMount() {
    const {id, actions} = this.props;
    actions.fetchGifts(id);
  }

  render() {
    const {id, actions, gifts, showButtons, author} = this.props;
    return (
      <div>
        {showButtons && <AddGift id={id} actions={actions} gifts={gifts} />}
        <GiftList id={id} actions={actions} gifts={gifts} showButtons={showButtons} author={author} />
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
