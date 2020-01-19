import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../common/table/Table';
import './viewInventories.css';

export default function ViewInventories({ books }) {
	const [ state, setState ] = useState({ searchValue: '', curPage: 1, startCount: 0 });

	const numPerPage = 10;
	let numOfPages = Math.ceil(books.length / numPerPage);
	let totalNoOfPages = books.length;
	let defaultBookValues = [ ...Array(numOfPages) ].map((e) => Array(0));
	let listCount = [ { listStart: 1, listEnd: books.length > numPerPage ? numPerPage : books.length } ];
	let lStart = 1;
	console.log(defaultBookValues);
	if (!state.searchValue && books.length > 0) {
		console.log('Iamhere');
		let j = 0;
		for (let i = 0; i < books.length; i++) {
			const { ISBN, bookTitle, author, NoOfCopies, categoryOfBook, _id } = books[i];
			if (defaultBookValues[j].length !== 0 && defaultBookValues[j].length % numPerPage === 0) {
				j = j + 1;
				lStart = lStart + numPerPage;

				listCount.push({
					listStart: lStart,
					listEnd: lStart - 1 + (books.length - i < numPerPage ? books.length - i : numPerPage)
				});
			}

			defaultBookValues[j].push({
				ISBN: <Link to={`/viewInventories/${_id}`}>{ISBN}</Link>,
				bookTitle,
				author,
				NoOfCopies,
				categoryOfBook
			});
		}
	} else {
		const { searchValue } = state;
		const searchValLower = searchValue.toLowerCase();
		if (searchValue) {
			defaultBookValues = [ ...Array(numOfPages) ].map((e) => Array(0));
			let j = 0;
			let foundBoooks = 0;
			listCount = [];
			for (let i = 0; i < books.length; i++) {
				const { ISBN, bookTitle, author, NoOfCopies, categoryOfBook } = books[i];

				if (
					bookTitle.toLowerCase().includes(searchValLower) ||
					author.toLowerCase().includes(searchValLower) ||
					ISBN.includes(searchValLower) ||
					categoryOfBook.toLowerCase().includes(searchValLower)
				) {
					foundBoooks++;
					if (defaultBookValues[j].length !== 0 && defaultBookValues[j].length % numPerPage === 0) {
						j = j + 1;
					}
					defaultBookValues[j].push({
						ISBN: <Link to={`/viewInventories/${ISBN}`}>{ISBN}</Link>,
						bookTitle,
						author,
						NoOfCopies,
						categoryOfBook
					});
				}
			}
			if (foundBoooks > 0) {
				lStart = 1;
				for (let i = 0; i < foundBoooks; i++) {
					if (i % numPerPage == 0) {
						listCount.push({
							listStart: lStart,
							listEnd: lStart - 1 + (foundBoooks - i < numPerPage ? foundBoooks - i : numPerPage)
						});
						lStart = lStart + numPerPage;
					}
				}
			}
			totalNoOfPages = foundBoooks;
			numOfPages = Math.ceil(foundBoooks / numPerPage);
		}
	}

	useEffect(() => {}, [ state, defaultBookValues ]);

	const handlechange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handlePrevClick = () => {
		if (curPage > 1) {
			setState({ ...state, curPage: curPage - 1, startCount: startCount - 1 });
		}
	};
	const handleNextClick = () => {
		if (curPage < numOfPages) {
			setState({ ...state, curPage: curPage + 1, startCount: startCount + 1 });
		}
	};

	const tableHeader = [ 'ISBN', 'bookTitle', 'author', 'NoOfCopies', 'categoryOfBook' ];
	const { searchValue, curPage, startCount } = state;

	return (
		<div>
			<div className="search-parent utils-mg-bt-small">
				<input
					type="text"
					className="textbox"
					placeholder="Search.."
					name="searchValue"
					value={searchValue}
					onChange={handlechange}
				/>
				<input title="Search" value="" type="submit" className="button-search" />
			</div>
			<div className="inventory-table">
				{listCount[startCount] &&
				totalNoOfPages > 0 && (
					<div className="utils-mg-bt-vsmall text-center">
						Listing{`${listCount[startCount].listStart} - ${listCount[startCount]
							.listEnd} of ${totalNoOfPages}`}
					</div>
				)}
				<Table
					tableData={!defaultBookValues[startCount] ? defaultBookValues : defaultBookValues[startCount]}
					tableHeader={tableHeader}
				/>
				{numOfPages > 0 && (
					<div className="utils-mg-tp-vsmall text-center">
						<span onClick={handlePrevClick} className="pointer">&#60;</span>
						<span>pages {`${curPage} of ${numOfPages}`}</span>
						<span onClick={handleNextClick} className="pointer">&#62;</span>
					</div>
				)}
			</div>
		</div>
	);
}
