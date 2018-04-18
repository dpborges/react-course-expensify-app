import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
// import { editExpense, startRemoveExpense, startEditExpense  } from '../actions/expenses';


// export class LoginPage extends React.Component  { 

//     onButtonClickLogin = () => {
//         // this.props.startRemoveExpense({ id: this.props.expense.id });
//         // this.props.history.push("/");
//     };

//     render() {
//         return (
//             <div>
//                 <button 
//                     onClick={this.onButtonClickLogin}>
//                     Login
//                 </button>
//             </div>
//         );
//     }
// };


export const LoginPage  = ({ startLogin }) =>  (  // use destructing to obtain function prop
    <div>
        <button onClick={startLogin}>
            Login
        </button>
    </div>
);
   
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);



//Uses implicit return
// const mapDispatchToProps = (dispatch, ownProps) => ({
//     startEditExpense: (id, expense)  => dispatch(startEditExpense(id, expense)),
//     startRemoveExpense: ( data ) => dispatch(startRemoveExpense(data))
// });


//Uses explicit return
// // Find the single expense we want to edit and pass via props to component
// const mapStateToProps = (state, props) => {
//     return {
//         expense: state.expenses.find((expense) => {
//             return expense.id === props.match.params.id;
//         })
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);