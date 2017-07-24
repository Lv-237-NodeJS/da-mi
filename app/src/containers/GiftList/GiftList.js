import React from 'react';
import { Accordion, Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditGift, Donor, Comments } from 'src/containers';
import * as commentActions from 'src/containers/Comments/commentActions';
import * as donorActions from 'src/containers/Donor/donorActions';
import './giftList.scss';

export  class GiftList extends React.Component {

  render() {
    const giftNode = this.props.gifts.map((gift, id) => {

      const commentList = (e) => {
        e.preventDefault();
        this.props.actionsComment.retrieveComments(this.props.id, gift.id);
      };

      const handleDelete = e => {
        e.preventDefault();
        this.props.actions.deleteGift(this.props.id, gift.id);
      };

      const handleDonorList = e => {
        e.preventDefault();
        this.props.actionsDonor.getDonor(this.props.id, gift.id);
      };

      const handleDonorCreate = e => {
        e.preventDefault();
        this.props.actionsDonor.createDonor(this.props.id, gift.id);
        handleDonorList();
      };

      return (
        <Panel header={gift.name} eventKey={gift.id} key={gift.id}  onClick={commentList, handleDonorList}>
          {!!gift.image &&
            <div className='gift-image' style={{backgroundImage: `url(${gift.image})`}} />}
          <div className='desc-block'> 
            <p><span className='gift-caption'>Description:</span>{gift.description}</p>
            {!!gift.link && <p><span className='gift-caption'>Link:</span>
              <a href={gift.link} target='_blank'>link to present</a>
            </p>}
            <Donor />
            {this.props.showButtons &&
            <ButtonToolbar>
              <EditGift id={this.props.id} gift={gift} actions={this.props.actions} />
              <Button bsStyle='danger' bsSize='small' onClick={handleDelete}>
                Delete
              </Button>
              {gift.is_available === true &&
              <Button bsStyle='success' bsSize='small' onClick={handleDonorCreate}>Choose</Button>}
            </ButtonToolbar>}
          </div>
          <hr />
          <Comments giftId={gift.id} eventId={this.props.id} author={this.props.author} />
        </Panel>
      );
    });

    return (
      <Accordion>
        {giftNode}
      </Accordion>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments.comments,
  donor: state.donor.donor
});
const mapDispatchToProps = dispatch => ({
  actionsComment: bindActionCreators(commentActions, dispatch),
  actionsDonor: bindActionCreators(donorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftList);
