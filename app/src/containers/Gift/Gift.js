import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fileActions from 'src/components/FileUploader/fileUploaderActions';
import * as giftActions from './giftActions';
import { GiftList, AddGift } from 'src/containers';

class Gift extends React.Component {
  componentWillMount() {
    const {id, actions} = this.props;
    actions.fetchGifts(id);
  }

  render() {
    const {id, actions, gifts, showButtons, author, fileUrl, fileActions} = this.props;
    return (
      <div>
        {showButtons &&
          <AddGift
          id={id}
          actions={actions}
          file={fileUrl}
          fileActions={fileActions}
          gifts={gifts}
          />
        }
        <GiftList
        id={id}
        actions={actions}
        fileActions={fileActions}
        file={fileUrl}
        gifts={gifts}
        showButtons={showButtons}
        author={author}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gifts: state.gift.gifts,
  fileUrl: state.fileUploader.fileUrl
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(giftActions, dispatch),
  fileActions: bindActionCreators(fileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Gift);
