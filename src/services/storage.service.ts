import {devEnvironment} from '../../environment/environment.dev';

export function setLocalStorage(key: string, value: string) {
    window.localStorage.setItem(`${devEnvironment.appPrefix}${key}`, value);
}

export function getLocalStorage(key: string) {
    return window.localStorage.getItem(`${devEnvironment.appPrefix}${key}`);
}