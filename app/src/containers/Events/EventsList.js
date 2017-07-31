import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from './eventsListActions';
import { NewEvent } from 'src/containers';
import './eventsList.scss';
import { Alerts } from 'src/components';

class EventsList extends React.Component {

  componentWillMount() {
    this.props.actions.retrieveEvents();
  }

  render() {
    const { location, eventsList, invitations } = this.props;
    const events = location === '/events' && eventsList || invitations;
    const eventNode = events.map(item => {
      const formattedDate = moment(item.date_event, 'x').format('DD MMM YYYY hh:mm a');
      return (
        <Link to={`${location}/${item.id}`} className='list-group-item' key={item.id}>
          <ListGroup>
            <ListGroupItem header={item.name}>{formattedDate}</ListGroupItem>
          </ListGroup>
        </Link>
      );
    });

    const noEvent = (
      <Jumbotron className='no-content-block'>
        {location === '/events' && eventsList &&
        <h4 className='no-events-message'>You have no events scheduled</h4> ||
        <h4 className='no-events-message'>You have no invitations scheduled</h4>}
      </Jumbotron>
    );

    return (
      <div className='eventsList'>
        {location === '/events' && eventsList && 
        <div>
          <h2>Events</h2>
          <hr />
          <Alerts />
          <NewEvent />
          <hr />        
        </div>  ||
        <div>
          <h2>Invitations</h2>
          <hr />
        </div>}
        {!eventNode.length && noEvent || eventNode}      
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  eventsList: state.eventsList.events,
  invitations: state.eventsList.myInvitations,
  location: ownProps.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
