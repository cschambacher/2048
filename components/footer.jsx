import React from "react";
// import { Link } from "react-router-dom";


class LandingFooter extends React.Component {

    render() {
        return (
            <div id="footer-container">
                <div id="footer-group">
                    <div id="logo-font">2048</div>
                    <p>&copy; 2020 Corina Schambacher</p>
                </div>
                <div id="footer-group">
                
                    <a href="https://github.com/corina-s/2048">
                    <div id="footer-link">gitHub</div></a>
                   
                </div>
                <div id="footer-group">
                    <p> Based on the open source project 2048 by Gabriele Cirulli.</p>
                    <p>Similar to Threes by Asher Vollmer & Greg Wohlwend.</p>
                </div>
            </div>
        );
    }
}

export default LandingFooter;