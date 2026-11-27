import React from "react";
import Area from "@components/common/Area";
import LoadingBar from "@components/common/LoadingBar";
import "../../css/global.scss";
import "./Layout.scss";
import "./tailwind.scss";

export default function Layout() {
  return (
    <>
      <LoadingBar />
      <div className="header">
  <div className="page-width flex justify-between items-center">
    <div className="header__logo">
      <a href="/">
      Mass<span>-shop</span>
      </a>
    </div>
    <Area
      id="header"
      noOuter
      coreComponents={[
        {
          component: { default: Area },
          props: {
            id: "icon-wrapper",
            className: "icon-wrapper flex justify-between space-x-1",
          },
          sortOrder: 20,
        },
      ]}
    />
  </div>
</div>

      <main className="content">
        <Area id="content" className="" noOuter />
      </main>
      <div className="footer">
       <footer className="brutal-footer">
      <div className="brutal-footer__container">
        <div className="brutal-footer__col">
          <div className="brutal-footer__logo">
            MASS-shop
          </div>
          <div className="brutal-footer__desc">
            Магазин для сильных.  
            <br />Качество. Дисциплина. Результат.
          </div>
        </div>


        <div className="brutal-footer__col">
          <ul className="brutal-footer__links">
            <li>
              <a href="mailto:support@projectx.site" className="brutal-footer__link">
                support@massshop.site
              </a>
            </li>
            <li>
              <a href="#" className="brutal-footer__link">
                Политика конфиденциальности
              </a>
            </li>
            <li>
              <a href="#" className="brutal-footer__link">
                Telegram
              </a>
            </li>
            {/* Можно добавить и другие ссылки — например, Instagram, VK, если нужно */}
          </ul>
        </div>

        <div className="brutal-footer__copy">
          © {new Date().getFullYear()} MassShop. Все права защищены.
        </div>
      </div>
    </footer>
      </div>
    </>
  );
}

export const layout = {
  areaId: "body",
  sortOrder: 1,
};
