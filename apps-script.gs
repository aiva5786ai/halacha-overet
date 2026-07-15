/**
 * סקריפט קליטת דיווחים — "הלכה עוברת"
 * מדביקים את הקוד הזה ב-Google Apps Script המחובר לטבלת הגוגל שיטס,
 * ומפרסמים כ-Web App (הוראות מלאות ב-README.md).
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('דיווחים');
  if (!sheet) {
    sheet = ss.insertSheet('דיווחים');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['תאריך ושעה', 'שם המורה', 'שם בית הספר', 'יישמה את הרעיון', 'שיתוף אישי', 'שם מלא לדיווח לרבי']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }
  var p = e.parameter;
  sheet.appendRow([
    new Date(),
    p.teacherName || '',
    p.schoolName || '',
    p.implemented || '',
    p.sharing || '',
    p.fullName || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
