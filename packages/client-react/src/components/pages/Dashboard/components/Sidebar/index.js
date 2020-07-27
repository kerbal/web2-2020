import React from 'react';
// import { icons } from '../../../../../assets';

const SidebarItem = props => {
  const { name, icon, onItemClick, currentItem } = props;
  const isSelected = name === currentItem;
  const renderItem = () => {
    return (
      <div
        className="flex flex-row pt-6"
        onClick={() => onItemClick && onItemClick(name)}
      >
        <div>
          <img
            src={icon}
            alt=""
            className="object-contain w-6 h-6 opacity-50"
          />
        </div>
        <div className="pl-6">{name}</div>
      </div>
    );
  };
  return isSelected ? (
    <div className="cursor-pointer">{renderItem()}</div>
  ) : (
    <div className="opacity-50 cursor-pointer">{renderItem()}</div>
  );
};

const Seperator = () => {
  return <div className="h-6" />;
};

const Sidebar = props => {
  const { sidebarItems, currentItem, setCurrentSidebarItem } = props;
  const onItemClick = item => {
    setCurrentSidebarItem(item);
  };
  return (
    <div className="px-6" style={{ width: '250px' }}>
      {sidebarItems.map(item => {
        if (item.name === 'Seperator') {
          return <Seperator />;
        }
        return (
          <SidebarItem
            icon={item.icon}
            name={item.name}
            currentItem={currentItem}
            onItemClick={onItemClick}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
