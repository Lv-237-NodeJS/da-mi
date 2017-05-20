import React from 'react';
import {Link} from 'react-router';




export class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
            <h1>About...</h1>
            <h1>Contact...</h1>
            <p>User ID: {this.props.params.id}</p>
         
            
         
        
         </div>

         
      )
   }
}