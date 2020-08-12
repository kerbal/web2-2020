import React, { useState } from 'react';
import SearchBar from '../../../../common/SearchBar';
import TableView from '../../../../common/TableView';
import FunctionButton from '../../../../common/FunctionButton';
import Header from '../../components/Header';
import Loading from '../../../../common/Loading';

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-col p-6 w-screen">{children}</div>;
};

const ToolbarContainer = props => {
  const { children } = props;
  return (
    <div className="flex justify-between items-center mb-3">{children}</div>
  );
};

const SearchbarContainer = props => {
  const { children } = props;
  return <div className="w-1/2">{children}</div>;
};

const TooltipContainer = props => {
  const { children } = props;
  return <div className="font-light italic">{children}</div>;
};

const TableViewContainer = props => {
  const { children } = props;
  return <div className="pt-6">{children}</div>;
};

const LoadMoreBtnContainer = props => {
  const { children } = props;
  return <div className="pt-6 w-1/4 self-center">{children}</div>;
};

const HomeComponent = props => {
  const { name, columns, data, onClick, onLoadMore, loading, onSearch } = props;

  return (
    <>
      <Header pageTitle="Admin Portal" />
      <ContentContainer>
        <ToolbarContainer>
          <SearchbarContainer>
            <SearchBar
              placeholder="Search customer username or email"
              onSearch={onSearch}
            />
          </SearchbarContainer>
          <TooltipContainer>
            Double click on a customer to view more details
          </TooltipContainer>
        </ToolbarContainer>
        <TableViewContainer>
          <TableView
            name={name}
            columns={columns}
            data={data}
            onClick={onClick}
          />
        </TableViewContainer>
        <LoadMoreBtnContainer>
          <FunctionButton label="Load More" onClick={onLoadMore} />
        </LoadMoreBtnContainer>
      </ContentContainer>
      {loading && <Loading />}
    </>
  );
};

export default HomeComponent;
