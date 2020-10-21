import React ,{useState ,useEffect} from 'react';
import './Nav.css';
function Nav() {

    const [show,handleShow]= useState(false);

    useEffect(() => {
    
        window.addEventListener("scroll", () => {
          if(window.scrollY >100){
          handleShow(true);
        }
          else
          {
            handleShow(false);
          }
        });
        return () =>
        {
            window.removeEventListener("scroll");
        };
    }, [])
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo"
            src="https://pmcvariety.files.wordpress.com/2020/05/netflix-logo.png"
            alt="netflix"
            />

<img className="nav_avatar"
           
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt="netflix-avatar"
            />
           
        </div>
    )
}

export default Nav
