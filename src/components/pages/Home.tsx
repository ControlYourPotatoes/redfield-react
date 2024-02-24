import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access query params
import { scroller } from 'react-scroll'; // Assuming you're using react-scroll for smooth scrolling
import VideoSection from '../VideoSection';

function Home() {
    const location = useLocation(); // Hook to get access to the location object

    useEffect(() => {
       
            const searchParams = new URLSearchParams(location.search);
            const scrollTo = searchParams.get('scrollTo'); // Get the scrollTo query parameter

            if (scrollTo) {
                // Use react-scroll's scroller to scroll to the desired section
                setTimeout(() => {
                scroller.scrollTo(scrollTo, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    offset: -100, // adjust this depending on your header size
                });
            }, 100); // Small delay to ensure the page elements have loaded
        }
    }, [location]); // This effect runs whenever the location changes

    return (
        <>
            <VideoSection/>
        </>
    );
}

export default Home;
