import styles from './index.module.scss';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
};

type Content = {
  href: string;
  text: string;
};

const workoutContents: Content[] = [
  { href: '/workout/5-3-1-generator', text: '5/3/1 generator' },
  { href: '/workout/5-5-generator', text: '5x5 generator' },
];

const title = 'My Tools';

export const DefaultLayout = (props: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const switchDrawer = (): void => setOpen((x) => !x);
  const menuList = (
    <>
      <List>
        <Link href="/" passHref>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Top</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {workoutContents.map((c, i) => (
          <Link href={c.href} passHref key={c.text}>
            <ListItem button>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText>{c.text}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={switchDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {props.title ?? title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={switchDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={switchDrawer}
          onKeyDown={switchDrawer}
        >
          {menuList}
        </Box>
      </Drawer>
      {props.children}
    </>
  );
};
