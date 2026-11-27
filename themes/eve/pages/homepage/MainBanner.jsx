import React from "react";
import "./MainBanner.scss";

function MainBanner() {
 return (
  <div className="massshop-hero-banner">
    <div className="massshop-hero-banner__overlay" />
    <div className="massshop-hero-banner__content">
      <h1 className="massshop-hero-banner__title">
        Переходи на новый уровень
      </h1>
      <a className="massshop-hero-banner__btn" href="/page/aboutus">
        О нас
      </a>
    </div>
    <style>{`
      .massshop-hero-banner {
        position: relative;
        width: 100vw;
        min-height: 65vh;
        height: 530px;
        max-height: 95vh;
        background: url('/main-banner.jpg') center center/cover no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .massshop-hero-banner__overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(25, 31, 71, 0.3) 30%, rgba(76,60,109,0.4) 100%);
        z-index: 1;
      }
      .massshop-hero-banner__content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 5vw;
      }
      .massshop-hero-banner__title {
        color: #f4f6fa;
        font-weight: 900;
        font-size: 4.6rem;
        letter-spacing: 4px;
        line-height: 1.07;
        text-transform: uppercase;
        margin-bottom: 30px;
        margin-top: 0;
        text-align: center;
        width: 100%;
        max-width: 1200px;
      }
      .massshop-hero-banner__title span {
        color: #4A51C2;
        text-shadow: 0 3px 18px #6a69e7ad, 0 2px 4px #23235c;
      }
      .massshop-hero-banner__subtitle {
        color: #d7dbf3;
        margin-bottom: 32px;
        font-weight: 600;
        font-size: 2.0rem;
        text-shadow: 0 2px 10px #202050cc;
        letter-spacing: 1.2px;
        text-align: center;
        max-width: 800px;
      }
      .massshop-hero-banner__btn {
        background: linear-gradient(94deg, #4A51C2 60%, #8557db 120%);
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 18px 48px;
        font-weight: 800;
        font-size: 1.24rem;
        letter-spacing: 1.19px;
        text-transform: uppercase;
        box-shadow: 0 2px 18px #4a51c25d;
        margin-top: 14px;
        text-decoration: none;
        display: inline-block;
        transition: background 0.15s, color 0.13s, box-shadow 0.14s;
      }
      .massshop-hero-banner__btn:hover {
        background: linear-gradient(92deg, #383da6 60%, #7057b1 120%);
        color: #fff;
        box-shadow: 0 4px 22px #2e347edc;
      }
      @media (max-width: 1000px) {
        .massshop-hero-banner {
          height: 360px;
        }
        .massshop-hero-banner__title {
          font-size: 2.7rem;
          margin-bottom: 20px;
        }
        .massshop-hero-banner__subtitle {
          font-size: 1.14rem;
          margin-bottom: 22px;
        }
        .massshop-hero-banner__btn {
          padding: 13px 32px;
          font-size: 1rem;
        }
      }
      @media (max-width: 600px) {
        .massshop-hero-banner {
          height: 270px;
        }
        .massshop-hero-banner__title {
          font-size: 1.5rem;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .massshop-hero-banner__subtitle {
          font-size: 0.92rem;
          margin-bottom: 13px;
        }
        .massshop-hero-banner__btn {
          padding: 8px 18px;
          font-size: 0.93rem;
          border-radius: 6px;
        }
      }
    `}
    </style>
  </div>
);



}


export default MainBanner;

export const layout = {
  areaId: "content",
  sortOrder: 1,
};
