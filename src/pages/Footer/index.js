import React from "react";


import "./footer.css";
import Instagram from "@mui/icons-material/Instagram";
import Facebook from "@mui/icons-material/Facebook";
import YouTube from "@mui/icons-material/YouTube";
import Twitter from "@mui/icons-material/Twitter";

function Index() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="https://purwadhika.com/job-connector-full-stack-web-development">
                  about us
                </a>
              </li>
              <li>
                <a href="https://purwadhika.com/job-connector-full-stack-web-development">
                  our services
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>pharmacy </h4>
            <ul>
              <li>
                <a href="/">product</a>
              </li>
              <li>
                <a href="/customorders">Custom</a>
              </li>
              <li>
                <a href="/cart">cart</a>
              </li>
              <li>
                <a href="/usertransactions">transaction</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>payment</h4>
            <ul>
              <li>
                <a href="https://www.bca.co.id/id/Individu/produk/simpanan/Tahapan/PasporBCAMastercard">
                  BCA
                </a>
              </li>
              <li>
                <a href="https://www.bankmandiri.co.id/mandiri-debit">
                  Mandiri
                </a>
              </li>
              <li>
                <a href="https://bri.co.id/britama-x">BRI</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/purwadhikaschool/?hl=id">
                <Instagram fontSize="large" />
              </a>
              <a href="https://www.youtube.com/c/PurwadhikaTV">
                <YouTube fontSize="large" />
              </a>
              <a href="https://www.facebook.com/purwadhikadigitalschool">
                <Facebook fontSize="large" />
              </a>
              <a href="https://twitter.com/PurwadhikaClass">
                <Twitter fontSize="large" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Index;
