import React from 'react';

import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footer">
      <footer className="py-3">
        <div className="container">
          <div className="row justify-content-between small">
            <div className="col-md-4">
              Copyright &copy; 2022 Company Inc. All rights reserved.
            </div>
            <div className="col-md-5">
              Site Map &nbsp;&nbsp;&nbsp;&nbsp; Accessibility &nbsp;&nbsp;&nbsp;&nbsp; Terms of Use &nbsp;&nbsp;&nbsp;&nbsp; Privacy
            </div>
            <div className="col-md-2">
              United States
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
