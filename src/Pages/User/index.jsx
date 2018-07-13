import React from 'react';
import UserRule from "../../Components/UserRule";
import UserManage from '../../Components/UserManage';
import ActiveUser from '../../Components/ActiveUser';
import Cad from '../../Components/Cad';
import Ad from '../../Components/Ad';
import MailLog from '../../Components/MailLog';
import Notice from '../../Components/Notice';
import Layout from "../../Components/Layout";

const User = (location) => {
    let content;
    switch (location.match.params.path) {
        case 'rule': content = <UserRule/>; break;
        case 'user': content = <UserManage/>; break;
        case 'unActive': content = <ActiveUser/>; break;
        case 'cad': content = <Cad/>; break;
        case 'ad': content = <Ad/>; break;
        case 'mail': content = <MailLog/>; break;
        case 'notice': content = <Notice/>; break;
        // case 'center': content = <PersonalCenter/>; break;
        default:  content = <div>
            错误的路径.
        </div>;
    }

    return (
        <Layout content={content} path={location.match.params.path}/>
    );

};

export default User;