/**
 * Printabilya leads → Google Sheet (+ email alert to the shop)
 *
 * Lives OUTSIDE the website repo: paste this into the Apps Script editor of the
 * leads spreadsheet (Extensions → Apps Script). Setup steps: SETUP.md.
 *
 * Flow: website form → Cloudflare function /api/lead → this web app → new row.
 *
 * Script Properties (Project Settings → Script Properties):
 *   SHARED_SECRET  same value as SHEETS_SHARED_SECRET in Cloudflare
 *   NOTIFY_EMAIL   who gets an email per lead, comma-separated (optional)
 */

const SHEET_NAME = 'Leads';
const HEADERS = [
  'Received (PH time)', 'Full name', 'Contact number', 'Email', 'Service',
  'Details', 'Preferred contact', 'Heard about us', 'Sent from page', 'Status', 'Notes',
];
const SERVICE_LABELS = {
  'apparel-sublimation': 'Apparel & Sublimation',
  'uv-printing': 'UV Printing',
  'signage': 'Signage, Stickers & Vehicle Graphics',
  'business': 'Business & Presentation',
  'other': 'Not sure / other',
};

function doPost(e) {
  const props = PropertiesService.getScriptProperties();

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }

  // Apps Script can't read request headers, so the secret travels in the body.
  const secret = props.getProperty('SHARED_SECRET');
  if (!secret || !data || data.secret !== secret) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  const lead = data.lead || {};
  const row = [
    Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd HH:mm'),
    text_(lead.fullName),
    asText_(lead.contactNumber),          // keep the leading 0 in 09XX numbers
    text_(lead.email),
    SERVICE_LABELS[lead.service] || text_(lead.service),
    text_(lead.details),
    text_(lead.preferredContact),
    text_(lead.source),
    text_(lead.page),
    'New',
    '',
  ];

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);                   // two leads at once won't collide
  try {
    getSheet_().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  // A failed email must never lose the lead: the row is already saved.
  try {
    notify_(props.getProperty('NOTIFY_EMAIL'), row);
  } catch (err) {
    console.error('Lead saved, email failed: ' + err);
  }

  return json_({ ok: true });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function notify_(to, row) {
  if (!to) return;
  const plain = function (v) { return String(v).replace(/^'/, ''); };  // drop the sheet's text marker
  const lines = HEADERS.slice(0, 9).map(function (h, i) { return h + ': ' + plain(row[i]); });
  MailApp.sendEmail({
    to: to,
    subject: 'New website inquiry: ' + plain(row[1]) + ' (' + plain(row[4]) + ')',
    body: lines.join('\n') + '\n\nOpen the sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  });
}

// Plain text, trimmed, and never interpreted as a formula (= + - @ are neutralized).
function text_(v) {
  const s = (v == null ? '' : String(v)).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Force text so Sheets doesn't turn 09171234567 into 9171234567.
function asText_(v) {
  const s = text_(v);
  return s && s.charAt(0) !== "'" ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once from the editor (select testDoPost → Run) to grant permissions
 * and check that a row + email arrive. Delete the test row afterwards.
 */
function testDoPost() {
  const secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  const res = doPost({
    postData: {
      contents: JSON.stringify({
        secret: secret,
        lead: {
          fullName: 'Test Lead', contactNumber: '09171234567', email: '',
          service: 'apparel-sublimation', details: 'Test from Apps Script editor',
          preferredContact: 'sms', source: 'facebook', page: '/contact',
        },
      }),
    },
  });
  console.log(res.getContent());
}
