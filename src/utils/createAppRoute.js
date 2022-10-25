import { APP_ROUTES } from "../consts/appRoutes"

export const createAppRoute = (route, data) => {
    let appRoute = APP_ROUTES[route];

    if(typeof data !== typeof undefined){
        for(let key in data){
            appRoute = appRoute.replace(`{${key}}`, data[key])
        }
    }

    return appRoute;
}