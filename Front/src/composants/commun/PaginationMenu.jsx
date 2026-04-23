import _ from "lodash";
import { useEffect } from "react";

const PaginationMenu = props => {


  const {
    totalMenus,
    nbMenuParPage,
    onPageChange,
    pageEncours
  } = props;

  useEffect(function(){
    window.scrollTo(0, 0);
  }, [pageEncours])

  const nbPage = Math.ceil(
    totalMenus / nbMenuParPage
  );

  if (nbPage === 1) return null;

  const pages = _.range(1, nbPage + 1);
  return (
    <ul className="pagination">
      {pages.map(page => {
        return (
          <li
            key={page}
            className={
              page === pageEncours
                ? "page-item active"
                : "page-item"
            }
          >
            <a
              className="page-link"
              href="#"
              onClick={e => onPageChange(e, page)}
            >
              {page}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default PaginationMenu;
