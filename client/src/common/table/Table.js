import React from 'react';
import "./Table.css"
export default function Table({ tableHeader, tableData }) {
	console.log(tableData)
	return (
		<div className="utils-overflow-auto">
			<table className="tableData">
                {tableHeader && <thead>
                    <tr>{tableHeader.map((curHeader, index) => (<th  key={index}>{curHeader}</th>))}</tr>
                </thead>}
				<tbody>
					{tableData.map((currentRow,index) => {
						const columns = Object.values(currentRow);
						return (
							<tr key={index}>
								{columns.map((col, index) => (<td key={index}>{col}</td>))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
