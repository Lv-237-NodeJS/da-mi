import React from 'react';
import { Accordion, Panel, Button, ButtonToolbar, Modal, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './giftList.scss';
import * as giftActions from '../../redux/gift';

class GiftList extends React.Component {
  componentWillMount() {
    const {id, actions} = this.props;
    actions.fetchGifts(id);
  }

  render() {
    const giftNode = this.props.gifts.map((gift, id) => {

      const handleDelete = e => {
        e.preventDefault();
        this.props.actions.deleteGift(this.props.id, gift.id);
      };

      return (
        <Panel header={gift.name} eventKey={gift.id} key={gift.id}>
          <p><strong>Description: </strong>{gift.description}</p>
          <p><strong>Link: </strong>{gift.link}</p>
          <ButtonToolbar>
            <Button bsStyle='info' bsSize='small'>Edit</Button>
            <Button bsStyle='danger' bsSize='small' onClick={handleDelete}>
              Delete
            </Button>
            {gift.is_available === true &&
            <Button bsStyle='success' bsSize='small'>Choose</Button>}
          </ButtonToolbar>
        </Panel>
      );
    });

    return (
      <div>
        <Accordion>
          {giftNode}
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gifts: state.gift.giftsList.gifts
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(giftActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftList);
