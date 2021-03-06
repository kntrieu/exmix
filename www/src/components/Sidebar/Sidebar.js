import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ListIcon from '@material-ui/icons/List';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import React from 'react';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
      },
      drawer: {
        [theme.breakpoints.up("sm")]: {
          width: drawerWidth,
          flexShrink: 0
        }
      },
      appBar: {
        [theme.breakpoints.up("sm")]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth
        }
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          display: "none"
        }
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#5DD6C9',
        border: 'none'
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3)
      },
      logoContainer: {
          height: '64px',
          backgroundColor: theme.palette.primary.main
      }
}));

const Sidebar = ({isMobileOpenSideBar, handleDrawerToggle}) => {
    const classes = useStyles();
    const container = window !== undefined ? () => window.document.body : undefined;
    const theme = useTheme();
    const drawer = (
        <div>
            <div className={`${classes.toolbar} ${classes.logoContainer}`}>
                <img src="/EXMIX_LOGO.png" width="240" height="64" alt="Exmix logo - Trộn đề online"/>
            </div>
            <List>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trang Chủ" />
                    </ListItem>
                </Link>
                <Link to="/thong-tin-ki-thi" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ImportContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thông Tin Kì Thi" />
                    </ListItem>
                </Link>
                <Link to="/danh-sach-cau-hoi" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thêm câu hỏi" />
                    </ListItem>
                </Link>
                <Link to="/ket-qua-tron" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <DoneAllIcon />
                        </ListItemIcon>
                        <ListItemText primary="Xem kết quả" />
                    </ListItem>
                </Link>
            </List>
            
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={isMobileOpenSideBar}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
};

export default Sidebar;