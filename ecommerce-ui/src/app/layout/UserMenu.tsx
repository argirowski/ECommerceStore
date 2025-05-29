import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { User } from "../models/user";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import {
  History,
  Inventory,
  LogoutOutlined,
  Person,
} from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
import { Link } from "react-router-dom";

type UserMenuProps = {
  user: User;
};

export default function FadeMenu({ user }: UserMenuProps) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{ fontSize: "1.1rem" }}
      >
        {user.email}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/orders">
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My Orders</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/inventory">
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText>Inventory</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
