import React from "react";
import { Avatar } from "@mui/material";

export const UserInfo = ({ name, username, avatar }) => {
    return (
        <div className="profile-container">
            <div>
                <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ width: 100, height: 100 }}>
                    {name[0]}</Avatar>
            </div>
            <div>
                <div>{name}</div>
                <div>{username}</div>
            </div>


        </div >
    )
}