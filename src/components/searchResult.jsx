import React from "react";

const SearchResult = (props) => {
  const { data } = props;
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Abstract</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td>{item.address.formatted}</td>
              <td>{item.abstract.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResult;
