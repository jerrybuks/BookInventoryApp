import React, { useState, useEffect } from 'react';
import Table from '../common/table/Table';
import './viewInventories.css';

export default function ViewInventories({ books }) {
	const [ state, setState ] = useState({ searchValue: '', curPage: 1, startCount: 0 });

	const numPerPage = 10;
	const numOfPages = Math.ceil(books.length / numPerPage);
	let defaultBookValues = [ ...Array(numOfPages) ].map((e) => Array(0));
	if (!state.searchValue) {
		let j = 0;
		for (let i = 0; i < books.length; i++) {
			const { ISBN, bookTitle, author, NoOfCopies, categoryOfBook } = books[i];
			if (i > 0 && i % numPerPage === 0) {
				j = j + 1;
				console.log(j);
			}
			defaultBookValues[j].push({
				ISBN,
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
			console.log('helooooooer');
			defaultBookValues = [ ...Array(numOfPages) ].map((e) => Array(0))
			let j = 0;
			for (let i = 0; i < books.length; i++) {
				const { ISBN, bookTitle, author, NoOfCopies, categoryOfBook } = books[i];
				if (
					bookTitle.toLowerCase().includes(searchValLower) ||
					author.toLowerCase().includes(searchValLower) ||
					ISBN.includes(searchValLower) ||
					categoryOfBook.toLowerCase().includes(searchValLower)
				) {
					if (i > 0 && i % numPerPage === 0) {
						j = j + 1;
						console.log(j);
					}
					console.log(books[i]);
					defaultBookValues[j].push({
                        ISBN,
                        bookTitle,
                        author,
                        NoOfCopies,
                        categoryOfBook
                    });
				}
			}
		}
	}

	useEffect(
		() => {
			console.log(state);
		},
		[ state, defaultBookValues ]
	);

	const handlechange = (e) => {
		console.log(e.target.value);
		setState({ [e.target.name]: e.target.value });
	};
	const handlePrevClick = () => {
		if (curPage > 1) {
			setState({ curPage: curPage - 1, startCount: startCount - 1 });
		}
	};
	const handleNextClick = () => {
		if (curPage < numOfPages) {
			setState({ curPage: curPage + 1, startCount: startCount + 1 });
		}
	};
	console.log(defaultBookValues);
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
			<Table tableData={defaultBookValues[startCount]} tableHeader={tableHeader} />
			<div>
				<span>pages {`${curPage} of ${numOfPages}`}</span>
				<span onClick={handlePrevClick}>prev</span>
				<span onClick={handleNextClick}>next</span>
			</div>
		</div>
	);
}
