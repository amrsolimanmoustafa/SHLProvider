import React, { Component } from 'react';
import {
  I18nManager,
} from 'react-native';

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
    en:{
        cancelOrder: 'Cancel order',
        callClient: 'Call client',
        available: 'Available',
        unavailable: 'Unavailable',
        second: 'second',
        youHaveNewOrder: 'You have a new order',
        approve: 'approve',
    },
    ar: {
        cancelOrder: 'الغاء الطلب',
        callClient: 'الاتصال بالعميل',
        available: 'متاح',
        unavailable: 'غير متاح',
        second: 'ثانية',
        youHaveNewOrder: 'لديك طلب جديد',
        approve: 'قبول',
    }
});

if(I18nManager.isRTL){
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    I18nManager.isRTL = true;
    strings.setLanguage('ar');
}else{
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false)
    I18nManager.isRTL = false;
    strings.setLanguage('en');
}

export default strings;