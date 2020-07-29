import React, { useEffect } from 'react';

const rawData = `[
  {
    "id": 2,
    "customer_id": 2,
    "type": "DEFAULT",
    "account_number": "2222222222222222",
    "balance": 2000000,
    "currency_unit": "VND",
    "created_date": "2020-07-19T06:09:19.054Z",
    "closed_date": null,
    "status": "NORMAL",
    "createdAt": "2020-07-19T06:09:19.056Z",
    "updatedAt": "2020-07-19T06:09:19.056Z",
    "depositAccountDetail": null
}
]`;

const TableView = props => {
  const { name = '', columns = [], data = [{}], onClick } = props;

  const renderTitleRow = () => {
    let result = '';
    if (!columns) return;
    columns.forEach(item => {
      result += `<th align="left" class="px-4 py-2">${item}</th>`;
    });
    return result;
  };

  const renderContent = () => {
    let result = '';
    if (!data) return;
    data.forEach((item, index) => {
      result +=
        index % 2 === 0
          ? `<tr class="hover:bg-gray-200">`
          : `<tr class="bg-gray-100 hover:bg-gray-200">`;
      for (const key in item) {
        if (key !== 'id') {
          result += `<td class="border px-4 py-2">${item[key]}</td>`;
        }
      }
      result += `</tr>`;
    });
    return result;
  };

  useEffect(() => {
    const titleRowContent = renderTitleRow();
    document.getElementById(`${name}-title-row`).innerHTML = titleRowContent;
    const dataContent = renderContent();
    document.getElementById(`${name}-content`).innerHTML = dataContent;
  }, []);

  return (
    <table
      id={name}
      className="table-auto cursor-default"
      onDoubleClick={() => onClick && onClick()}
    >
      <thead>
        <tr id={`${name}-title-row`} />
      </thead>
      <tbody id={`${name}-content`} />
    </table>
  );
};

export default TableView;
