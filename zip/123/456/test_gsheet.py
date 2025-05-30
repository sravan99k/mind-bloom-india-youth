import gspread
from google.oauth2.service_account import Credentials

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = Credentials.from_service_account_file("service_account.json", scopes=scope)
gc = gspread.authorize(creds)
sh = gc.open_by_url("https://docs.google.com/spreadsheets/d/1CzlyhPSHraAa8HYKtMF3tOUCmSABqzurO_anRdvyUYE/edit?gid=2048584728")
print("Worksheets:", [ws.title for ws in sh.worksheets()])