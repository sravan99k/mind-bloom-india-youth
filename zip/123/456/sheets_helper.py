import pandas as pd
import gspread
from google.oauth2.service_account import Credentials
import os
import streamlit as st
import json
import logging

def get_credentials(creds_path="service_account.json"):
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
    ]
    # Try Streamlit secrets first (for Streamlit Cloud)
    try:
        if hasattr(st, "secrets") and "gcp_service_account" in st.secrets:
            info = dict(st.secrets["gcp_service_account"])
            creds = Credentials.from_service_account_info(info, scopes=scopes)
            return creds
    except Exception as e:
        logging.warning(f"Could not load credentials from Streamlit secrets: {e}")
    # Fallback to file
    try:
        creds = Credentials.from_service_account_file(creds_path, scopes=scopes)
        return creds
    except Exception as e:
        logging.error(f"Could not load credentials from file: {e}")
        raise RuntimeError("Service account credentials not found. Please check your Streamlit secrets or service_account.json file.")

def fetch_google_sheet_as_df(sheet_url_or_key, worksheet_title=None, creds_path="service_account.json"):
    """
    Fetches a Google Sheet as a pandas DataFrame.
    Args:
        sheet_url_or_key: The full sheet URL or just the sheet key.
        worksheet_title: Optional, the name of the worksheet/tab to read. If None, uses the first worksheet.
        creds_path: Path to the service account JSON key file.
    Returns:
        pd.DataFrame of the sheet contents.
    """
    try:
        creds = get_credentials(creds_path)
        gc = gspread.authorize(creds)
        if "https://" in sheet_url_or_key:
            sh = gc.open_by_url(sheet_url_or_key)
        else:
            sh = gc.open_by_key(sheet_url_or_key)
        if worksheet_title:
            ws = sh.worksheet(worksheet_title)
        else:
            ws = sh.get_worksheet(0)
        data = ws.get_all_records()
        df = pd.DataFrame(data)
        return df
    except gspread.exceptions.APIError as e:
        logging.error(f"Google Sheets API error: {e}")
        st.error(f"Google Sheets API error: {e}")
        raise
    except gspread.exceptions.NoValidUrlKeyFound:
        msg = "Invalid Google Sheet URL or key. Please check your input."
        logging.error(msg)
        st.error(msg)
        raise
    except PermissionError as e:
        msg = ("Permission denied when accessing the Google Sheet. "
               "Make sure you have shared the sheet with your service account email.\n"
               "Service account email: "
               f"{json.load(open(creds_path)).get('client_email', '[unknown]') if os.path.exists(creds_path) else '[check secrets]'}")
        logging.error(msg)
        st.error(msg)
        raise
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        st.error(f"Unexpected error: {e}")
        raise
