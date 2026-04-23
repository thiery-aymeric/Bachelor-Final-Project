import _ from "lodash";
import { useEffect } from "react";

const PaginationActivite = props => {


  const {
    totalActivites,
    nbActiviteParPage,
    onPageChange,
    pageEncours
  } = props;

  useEffect(function(){
    window.scrollTo(0, 0);
  }, [pageEncours])

  const nbPage = Math.ceil(
    totalActivites / nbActiviteParPage
  );

  if (nbPage === 1 || nbPage<1) return null;

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

export default PaginationActivite;
