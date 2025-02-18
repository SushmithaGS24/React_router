


import { Link } from 'react-router-dom';

function Missing () {

    return (
        <main className='Missing'>

            <h1>Page Not found</h1>
            <p>
                <Link to ='/'>Visit our Home Page</Link>
            </p>
        </main>
    );

}

export default Missing;
