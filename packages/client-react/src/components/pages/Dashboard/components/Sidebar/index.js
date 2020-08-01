import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = props => {
  const {
    item: { name, icon, path },
  } = props;
  return (
    <NavLink
      className="flex flex-row mt-6 opacity-50"
      to={path}
      activeClassName="opacity-100"
    >
      <div>
        <img src={icon} alt="" className="object-contain w-6 h-6 opacity-50" />
      </div>
      <div className="pl-6">{name}</div>
    </NavLink>
  );
};

const Separator = () => {
  return <div className="h-6" />;
};

const Sidebar = props => {
  const { sidebarItems } = props;

  return (
    <div className="flex-1" style={{ maxWidth: '175px' }}>
      {sidebarItems.map(item =>
        item.name === 'Separator' ? (
          <Separator key={item.id} />
        ) : (
          <SidebarItem key={item.id} item={item} />
        )
      )}
    </div>
  );
};

export default Sidebar;
