import React from 'react'
import { checkToken } from "../utils/auth"
import { Provider, useDispatch } from 'react-redux';


const CheckToken = (props) => {
    const token = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const actions = props.navAction;

    if (token) {
        checkToken(token).then((res) => {
            dispatch(actions.login(res.data.email));
            //setEmail(res.data.email);
            //setIsLoggedIn(true);
            //history.push("/");
        })
        .catch((err) => {
            localStorage.removeItem("jwt");
            console.log("CHECK TOKEN", err);
        });
    }

    return('');
}

const CheckTokenWrapper = (props) => {
    const store = props.store;
    const actions = props.actions;

    return (
        <Provider store={store}>
            <CheckToken navAction={actions} />
        </Provider>
    )
}


export default CheckTokenWrapper 
