import _ from "lodash";

export function dtFr(date){
    if(_.isEmpty(date)){
        return "";
    }
    return new Intl.DateTimeFormat('fr-Fr', {dateStyle: 'full'}).format(new Date(date))
}

export function dtFrMin(date){
    if(_.isEmpty(date)){
        return "";
    }
    return new Intl.DateTimeFormat('fr-Fr', {dateStyle: 'short'}).format(new Date(date))
}

export const aujourdhui = new Date().getFullYear() +"-"+ ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + (new Date().getDate())).slice(-2); 


export function pagination(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _.chain(items)
      .slice(startIndex)
      .take(pageSize)
      .value();
}
  