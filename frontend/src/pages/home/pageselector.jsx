
  import MobileComponent from "./mobileViewHome/mobileComponent";
  import DesktopComponent from "./computerViewHome/Home";
  import{ useState, useEffect } from 'react';
  // Import React and necessary hooks
  // Import the mobile version of the component
  // Import the desktop version of the component

  const MainComponent = () => {
    // Define a state variable to track if the screen is mobile-sized
    const [isMobile, setIsMobile] = useState(false);

    // Function to handle screen resizing and update the isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // If the screen width is 768px or less, set isMobile to true
    };

    // useEffect hook runs on component mount and whenever the component updates
    useEffect(() => {
      handleResize(); // Check the screen size when the component first mounts
      window.addEventListener('resize', handleResize); // Add an event listener to check for screen resizing

      // Cleanup function to remove the event listener when the component unmounts
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect only runs on mount and unmount

    // Conditionally render the MobileComponent if isMobile is true, otherwise render DesktopComponent
    return isMobile ? <MobileComponent /> : <DesktopComponent />;
  };

  export default MainComponent; 
