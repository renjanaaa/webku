// Google Apps Script Backend for "Between Us" Q&A
// Deploy this as a web app and use the URL in your frontend

// Sheet configuration
const SHEET_NAME = "Responses";
const HEADERS = ["Timestamp", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];

// Initialize sheet (run this once)
function initializeSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Initialize if needed
    if (!sheet) {
      initializeSheet();
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    }
    
    // Prepare row data
    const row = [
      data.timestamp,
      data.responses[1] || "",
      data.responses[2] || "",
      data.responses[3] || "",
      data.responses[4] || "",
      data.responses[5] || "",
      data.responses[6] || "",
      data.responses[7] || "",
      data.responses[8] || "",
      data.responses[9] || "",
      data.responses[10] || ""
    ];
    
    // Add row to sheet
    sheet.appendRow(row);
    
    const output = ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
    
    // Add CORS headers
    output.setHeader("Access-Control-Allow-Origin", "*");
    output.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
    output.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    return output;
      
  } catch (error) {
    const output = ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
    
    // Add CORS headers to error response too
    output.setHeader("Access-Control-Allow-Origin", "*");
    output.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
    output.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    return output;
  }
}

function doOptions(e) {
  const output = ContentService.createTextOutput();
  output.setHeader("Access-Control-Allow-Origin", "*");
  output.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  output.setHeader("Access-Control-Allow-Headers", "Content-Type");
  output.setHeader("Access-Control-Max-Age", "86400");
  return output;
}

// Handle GET requests (optional - for testing)
function doGet(e) {
  const output = ContentService
    .createTextOutput(JSON.stringify({ message: "POST data to save responses" }))
    .setMimeType(ContentService.MimeType.JSON);
  
  output.setHeader("Access-Control-Allow-Origin", "*");
  output.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  output.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  return output;
}
