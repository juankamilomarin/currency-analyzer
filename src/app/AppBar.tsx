import React, { useState } from 'react';
import Drawer from './Drawer';
import Toolbar from './Toolbar';

const AppBar = () => {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('Home');

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  const onItemClick = (title: string) => setTitle(title)

  return (
    <React.Fragment>
      <Toolbar title={title} open={open} onMenuClick={handleDrawerOpen} />
      <Drawer
        open={open}
        onMenuClick={handleDrawerClose}
        onItemClick={onItemClick}
      />
    </React.Fragment>
  )
}

export default AppBar;