"use strict";


import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';


import {timer as timer}             from './parts/timer';
import {tabs as tabs}               from './parts/tabs';
import {slider as slider}           from './parts/slider';
import {popupWindow as popupWindow} from './parts/popup';
import {formInit as formInit}       from './parts/formInit';
import {anchorLink as anchorLink}   from './parts/anchorLink';
import {calc as calc}               from './parts/calc';



window.addEventListener('DOMContentLoaded', function() {
    formInit('.main-form');
    formInit('#form');
    anchorLink();
    tabs()
    timer('2019-01-22', '.hours', '.minutes', '.seconds');
    popupWindow();  
    slider();
    calc();  
});