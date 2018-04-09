// High Order Component or (HOC) - is a component (HOC) that renders another component
// Goal of HOC is to:
//       1) reuse code
//       2) Render Hijacking
//       3) Prop manipulation
//       4) Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// This compoment being rendered
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// Example #1 - withAdminWarning

// This is an HOC
// This allows us to modify existing compoments without have to write code a bunch of times.
const withAdminWarning = (WrappedComponent) => {  // pass in wrapped compoment (eg info)
    return (props) => (   // returns HOC
        <div>
            { props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent { ...props  }/>
        </div>
    )
};

const AdminInfo = withAdminWarning(Info);
ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById('app'));


// Example #2 - requireAuthentication 
const requireAuthentication = (WrappedComponent ) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please login to view the info</p>
            )}
         </div>   
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'));

