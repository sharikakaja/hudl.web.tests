export const generateEmail = (prefix = 'tstusr') => 
  `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}@tst.com`;