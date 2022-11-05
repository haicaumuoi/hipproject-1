import React from "react";

function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      <div className="space-y-4 text-xs text-gray-800 flex flex-col">
        <h5 className="font-bold">Facebook</h5>
        <a
          href="https://www.facebook.com/hainnnnnnnnn/"
          target={"_blank"}
          rel="noreferrer"
        >
          Hai Anh
        </a>
        <a
          href="https://www.facebook.com/thanh.buihuu.338"
          target={"_blank"}
          rel="noreferrer"
        >
          Huu Thanh
        </a>
        <a
          href="https://www.facebook.com/sihoang36"
          target={"_blank"}
          rel="noreferrer"
        >
          Si Hoang
        </a>
        <a
          href="https://www.facebook.com/biahudaom"
          target={"_blank"}
          rel="noreferrer"
        >
          Kim Dat
        </a>
      </div>
      <div className="space-y-4 text-xs text-gray-800 flex flex-col">
        <h5 className="font-bold">Github</h5>
        <a
          href="https://github.com/haicaumuoi"
          target={"_blank"}
          rel="noreferrer"
        >
          Hai Anh
        </a>
        <a href="https://github.com/pttaer" target={"_blank"} rel="noreferrer">
          Huu Thanh
        </a>
        <a href="https://github.com/misut4" target={"_blank"} rel="noreferrer">
          Si Hoang
        </a>
        <a
          href="https://github.com/warlockjr"
          target={"_blank"}
          rel="noreferrer"
        >
          Kim Dat
        </a>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">HOST</h5>
        <p>Netlify</p>
        <p>Heroku</p>
        <p>Hipproject</p>
        <p>
          Design inspired by{" "}
          <a href="https://indeed.com" target={"_blank"} rel="noreferrer">
            Indeed
          </a>
        </p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">SUPPORT</h5>
        <p>Link to project</p>
        <a
          href="https://github.com/haicaumuoi/hipproject-1"
          target={"_blank"}
          rel="noreferrer"
        >
          Github
        </a>
        <p>Check out my website</p>
        <a href="https://haicaumuoi.vercel.app">Hai Anh</a>
      </div>
    </div>
  );
}

export default Footer;
