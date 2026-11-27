import PropTypes from "prop-types";
import React from "react";

export default function MobileMenu({ menu: { items } }) {
  const [show, setShow] = React.useState(false);

  const styles = {
    container: {
      position: "relative",
      display: "inline-block",
    },
    button: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#003087",
      padding: 0,
    },
    nav: {
      position: "absolute",
      top: "48px",
      right: 0,
      background: "white",
      border: "1px solid #ddd",
      padding: "10px 0",
      listStyle: "none",
      minWidth: "150px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      margin: 0,
    },
    navItem: {
      textAlign: "center",
    },
    navLink: {
      display: "block",
      padding: "8px 16px",
      color: "#333",
      textDecoration: "none",
    },
    navLinkHover: {
      background: "#f0f0f0",
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={() => setShow(!show)}
        aria-label={show ? "Закрыть меню" : "Открыть меню"}>
        {show ? (
          // Иконка крестик
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Иконка бургер
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {show && (
        <ul style={styles.nav}>
            <li style={styles.navItem}>
              <a
                style={styles.navLink}
                href="/page/contacts"
                onClick={() => setShow(false)}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}>
                Контакты
              </a>
            </li>
            <li style={styles.navItem}>
              <a
                style={styles.navLink}
                href="/page/aboutus"
                onClick={() => setShow(false)}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}>
                О нас
              </a>
            </li>
            <li style={styles.navItem}>
              <a
                style={styles.navLink}
                href="/page/deliver"
                onClick={() => setShow(false)}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}>
                Доставка и оплата
              </a>
            </li>
        </ul>
      )}
    </div>
  );
}

MobileMenu.propTypes = {
  menu: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export const layout = {
  areaId: "icon-wrapper",
  sortOrder: 50,
};

export const query = `
  query {
    menu {
      items {
        name
        url
      }
    }
  }
`;
