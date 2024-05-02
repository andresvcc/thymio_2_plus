import React from 'react';
import styled from 'styled-components';

export interface TableColumn {
  key: string;
  label: string;
  render: (value: any) => React.ReactNode;
}

export interface TableData {
  [key: string]: any;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableData[];
  onClick?: (row: TableData) => void;
}

// Contenedor con desplazamiento vertical
const ScrollableContainer = styled.div`
  max-height: 300px; // Altura máxima del contenedor
  overflow-y: auto; // Habilita el desplazamiento vertical si el contenido excede la altura máxima
  width: 100%; // Asegura que el contenedor ocupe todo el ancho disponible
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const StyledHead = styled.thead`
  background-color: #ffffff;
  font-size: 0.9rem;
`;

const StyledHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
`;

const StyledBody = styled.tbody``;

const StyledRow = styled.tr`
  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

const StyledCell = styled.td<{ columnLabel: string; active: boolean }>`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.9rem;
  background-color: ${({ columnLabel, active }) => (active ? '#fafafa' : '#ffffff')};
`;

export const Table: React.FC<TableProps> = ({ columns, data, onClick = () => {} }) => {
  return (
    <ScrollableContainer>
      <StyledTable>
        <StyledHead>
          <tr>
            {columns.map((column, index) => (
              <StyledHeaderCell key={`${column.key}-${index}`}>{column.label}</StyledHeaderCell>
            ))}
          </tr>
        </StyledHead>
        <StyledBody>
          {data.map((row, rowIndex) => (
            <StyledRow key={`row-${rowIndex}`}>
              {columns.map((column, colIndex) => (
                <StyledCell
                  key={`cell-${rowIndex}-${colIndex}`}
                  columnLabel={column.label}
                  active={rowIndex % 2 === 0}
                  onClick={() => onClick(row)}
                >
                  {column.render(row[column.key])}
                </StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>
    </ScrollableContainer>
  );
};
