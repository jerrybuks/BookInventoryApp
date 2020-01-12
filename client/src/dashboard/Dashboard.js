import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import Card from '../common/card/Card';
import Table from '../common/table/Table';

export default function Dashboard({books}) {
	const authContext = useContext(AuthContext);
	console.log(authContext);

	const { user: { user: { userName } } } = authContext;
	
    const defaultBookProp = []
    if(books.length > 0) {
        for(let i = books.length-1; i>=0; i--) {
            const { ISBN, bookTitle, author, NoOfCopies, categoryOfBook } = books[i];
            defaultBookProp.push({
                ISBN,
                bookTitle,
                author,
                NoOfCopies,
                categoryOfBook
            })
            if(defaultBookProp.length > 5) break;
        }
    }
    const tableHeader = ["ISBN","bookTitle","author","NoOfCopies","categoryOfBook"]
	return (
		<div >
            <div className="utils-mg-bt-big">
            <Card>
				<h1>Hello {userName},</h1>
				<Card>
                    <div  className="text-center">
                        Total number of Inventories
                        <h1>{books.length}</h1>
                    </div>
                </Card>
			</Card>
            </div>
           <Table tableData={defaultBookProp} tableHeader={tableHeader}/>
		</div>
	);
}

