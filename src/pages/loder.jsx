import React from 'react';
import './ShimmerTable.css';

const ShimmerTable = ({ row = 5, col = 5, color = '020337' }) => {
  const shimmerRows = Array.from({ length: row }).map((_, index) => index);
  const shimmerCols = Array.from({ length: col }).map((_, index) => index);

  return (
    <div className="shimmer-table">
      <table>
        <thead>
          <tr>
            {shimmerCols.map((_, colIndex) => (
              <th key={colIndex} className="shimmer-cell"></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shimmerRows.map((_, rowIndex) => (
            <tr key={rowIndex}>
              {shimmerCols.map((_, colIndex) => (
                <td key={colIndex} className="shimmer-cell" style={{ backgroundColor: color }}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShimmerTable;
