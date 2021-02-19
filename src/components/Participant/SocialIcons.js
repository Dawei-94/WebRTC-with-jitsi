import React from "react";

const SocialIcons = ({ socialMedia }) => {
  return (
    <div className="social-icons">
      <ul className="list-unstyled">
        <li>
          <a href={socialMedia.paypal} target="_blank">
            <img
              src="/assets/img/paypal.png"
              className="img-fluid"
              width="135"
            />
          </a>
        </li>
        <li>
          <a href={socialMedia.facebook} target="_blank">
            <img
              src="/assets/img/facebook.png"
              className="img-fluid"
              width="48"
              height="48"
            />
          </a>
        </li>
        <li>
          <a href={socialMedia.instagram} target="_blank">
            <img
              src="/assets/img/instagram.png"
              className="img-fluid"
              width="45"
              height="45"
            />
          </a>
        </li>
        <li>
          <a href={socialMedia.twitter} target="_blank">
            <img
              src="/assets/img/twitter.png"
              className="img-fluid"
              width="45"
              height="45"
            />
          </a>
        </li>
        <li>
          <a href={socialMedia.youtube} target="_blank">
            <img
              src="/assets/img/youtube.png"
              className="img-fluid"
              width="48"
              height="48"
            />
          </a>
        </li>
        <li>
          <a href={socialMedia.tiktok} target="_blank">
            <img
              src="/assets/img/tiktok.png"
              className="img-fluid"
              width="48"
              height="48"
            />
          </a>
        </li>
        <li>
          <a href={socialMedia.snapchat} target="_blank">
            <img
              src="/assets/img/snapchat.png"
              className="img-fluid"
              width="45"
              height="45"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialIcons;
