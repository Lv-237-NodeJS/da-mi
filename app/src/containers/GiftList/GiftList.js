import React from 'react';
import { Accordion, Panel, Button, ButtonToolbar, Image } from 'react-bootstrap';
import { EditGift } from 'src/containers';
import './giftList.scss';

export default class GiftList extends React.Component {
  render() {
    const giftNode = this.props.gifts.map((gift, id) => {

      const handleDelete = e => {
        e.preventDefault();
        this.props.actions.deleteGift(this.props.id, gift.id);
      };

      const linkCheck = link => {
        let protocol = link.slice(0, 4);
        return ((protocol !== 'http') && 'http://') || '';
      };

      return (
        <Panel header={gift.name} eventKey={gift.id} key={gift.id}>
          {!!gift.image && <Image src={gift.image} responsive/>}
          <p><span className='event-caption'>Description:</span>{gift.description}</p>
          {!!gift.link && <p><span className='event-caption'>Link:</span>
            <a href={`${linkCheck(gift.link)}${gift.link}`}>{gift.link}</a>
          </p>}
          <ButtonToolbar>
            <EditGift id={this.props.id} gift={gift} actions={this.props.actions}/>
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
      <Accordion>
        {giftNode}
      </Accordion>
    );
  }
}
