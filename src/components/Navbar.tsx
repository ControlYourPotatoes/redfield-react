
import React, { useState, /*useEffect*/ } from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    // State variable to track the click
    const [click, setClick] = useState<boolean>(false);
    //const [button, setButton] = useState<boolean>(true);

    // Function to toggle the state
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    /*const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        } 
    };

    useEffect(() => {
        const handleResize = () => {
            showButton();
        };

        handleResize(); // Call initially and on resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
*/
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <div className="image-container Logo">
                            <img src='/assets/gifs/spinHurricane.gif' alt="Spinning-gif" className="image-style" />
                        </div>
                        <div>
                            <Link to='/' className="image-container Letters" onClick={closeMobileMenu}>
                                <img src='/assets/icon/Logo_small_white.png' alt="Letters" className="image-style" />
                            </Link>
                        </div>
                    </div>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'closed-icon' : 'opened-icon'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/About' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Contact_us' className='nav-links' onClick={closeMobileMenu}>
                                Contact Us
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Prices' className='nav-links' onClick={closeMobileMenu}>
                                Prices
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign up
                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
