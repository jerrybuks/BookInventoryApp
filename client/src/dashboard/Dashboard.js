import React, { useContext } from 'react';
import { Link } from "react-router-dom";
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
            const { ISBN, bookTitle, author, NoOfCopies, categoryOfBook, _id } = books[i];
            defaultBookProp.push({
                ISBN: (<Link to={`/viewInventories/${_id }`}>{ISBN}</Link>),
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
		<div className="utils-pd-vsmall">
            <div className="utils-mg-bt-big utils-mg-tp-small">
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

