import React from "react";
import "psl/src/components/footer/Footer.css";
function Footer() {
  return (
    <>
      <footer>
        <h5>
          <span className="health_unit_name">
            Kanlyte Technologies Ltd Copyright Reserved &copy;
            {new Date(Date.now()).getFullYear()}
          </span>
        </h5>
      </footer>
    </>
  );
}

export default Footer;
