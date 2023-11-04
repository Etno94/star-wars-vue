import {devEnvironment} from '../../environment/environment.dev.js';

export function setLocalStorage(key, value) {
    window.localStorage.setItem(`${devEnvironment.appPrefix}${key}`, value);
}

export function getLocalStorage(key) {
    return window.localStorage.getItem(`${devEnvironment.appPrefix}${key}`);
}