import React from 'react';

const TitleRow = ({ columns }) => {
  return (
    <tr>
      {columns.map(column => (
        <th key={column} align="left" className="px-4 py-2">
          {column}
        </th>
      ))}
    </tr>
  );
};

const DataContent = ({ item }) => {
  return (
    <>
      {Object.keys(item)
        .filter(key => !['id', 'depositAccountDetail'].includes(key))
        .map(key => (
          <td key={key} className="border px-4 py-2">
            {item[key]}
          </td>
        ))}
    </>
  );
};

const DataRow = ({ data, onClick }) => {
  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <tr
            key={item.id}
            id={item.id}
            onClick={e => onClick && onClick(e, item)}
            className={
              index % 2 === 0
                ? 'hover:bg-gray-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }
          >
            <DataContent item={item} />
          </tr>
        );
      })}
    </tbody>
  );
};

const TableView = props => {
  const { name = '', columns = [], data = [{}], onClick } = props;

  return (
    <div className="overflow-auto h-screen">
      <table id={name} className="table-auto cursor-default w-full">
        <thead>
          <TitleRow columns={columns} />
        </thead>
        <DataRow data={data} onClick={onClick} />
      </table>
    </div>
  );
};

export default TableView;
