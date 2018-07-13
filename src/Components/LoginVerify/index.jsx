import React from 'react';
import config from "../../Config/env";
import history from "../../Router/history";
import { getItem, removeItem } from "../../Utils/storage";

// 登录验证 过期则移除所有存储的数据
class LoginVerify extends React.PureComponent {
    componentDidMount() {
        const loginTime = getItem("loginTime");
        if (loginTime !== null) {
            if (Math.floor(Date.now()/1000) - loginTime >= config.loginEffect) {
                removeItem("token");
                removeItem("username");
                removeItem("_id");
                removeItem("loginTime");
            }
        } else {
            history.push('/login')
        }
    };

    render() {
        return (
            <div />
        );
    }
}

export default LoginVerify;