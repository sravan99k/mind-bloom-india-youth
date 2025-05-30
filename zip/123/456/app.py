import pandas as pd
from sheets_helper import fetch_google_sheet_as_df
import streamlit as st
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import io
import fpdf
import os
import base64
from io import BytesIO
import tempfile

# --- Global Resources (UPDATED STRUCTURE with more granular tags) ---
MENTAL_HEALTH_RESOURCES = {
    "India Helplines": {
        "Tele MANAS (Mental Health Helpline)": {"url": "14416", "tags": ["General", "Emotional Overwhelm/Anxiety", "General Depressive Symptoms", "Crisis"]},
        "Kiran Helpline (Social Justice & Empowerment)": {"url": "18005990019", "tags": ["General", "General Depressive Symptoms", "Emotional Overwhelm/Anxiety"]},
        "Sneha India (Suicide Prevention)": {"url": "04424640050", "tags": ["Severe Depression/Crisis", "Crisis", "Suicidal Ideation"]}
    },
    "Online Resources & Information": {
        "NCERT's Mental Health Resources (General)": {"url": "https://ncert.nic.in/pdf/announcement/Mental_Health_and_Well_Being_of_School_Students_A_Survey.pdf", "tags": ["General", "Emotional Overwhelm/Anxiety", "General Depressive Symptoms", "Teacher Resources", "Parental Resources"]},
        "MOHFW Mental Health Initiatives (Govt. of India)": {"url": "https://www.mohfw.gov.in/mental-health-care.html", "tags": ["General", "Policy"]},
        "WHO - Mental Health (India focus)": {"url": "https://www.who.int/india/health-topics/mental-health", "tags": ["General"]},
        "AASRA (Suicide Prevention & Support)": {"url": "http://www.aasra.info/", "tags": ["Severe Depression/Crisis", "Crisis", "Suicidal Ideation"]},
        "Vandrevala Foundation (Mental Health & Emotional Support)": {"url": "https://www.vandrevalafoundation.com/", "tags": ["General", "Emotional Overwhelm/Anxiety", "General Depressive Symptoms"]}
    },
    "Tips for Well-being": {
        "Mindfulness & Meditation Apps (Stress/Anxiety)": {"url": "Search 'mindfulness apps' or 'meditation apps' in your app store (e.g., Headspace, Calm, Insight Timer).", "tags": ["Emotional Overwhelm/Anxiety", "Well-being Tips"]},
        "Yoga & Physical Activity Benefits": {"url": "https://www.who.int/news-room/fact-sheets/detail/physical-activity", "tags": ["Emotional Overwhelm/Anxiety", "General Depressive Symptoms", "Well-being Tips"]},
        "Healthy Eating for Mental Health": {"url": "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/food-and-mental-health", "tags": ["Disordered Eating Habits", "Well-being Tips"]},
        "Managing Academic Pressure": {"url": "Consider seeking guidance from a school counselor or teacher for study strategies and time management.", "tags": ["Academic Stress", "Emotional Overwhelm/Anxiety", "Well-being Tips"]},
        "Building Healthy Relationships (Social)": {"url": "Engage in positive social activities and learn conflict resolution skills.", "tags": ["Social/Loneliness Stress", "Conduct/Aggression Issues", "Well-being Tips"]},
        "Emotional Regulation Techniques": {"url": "Practice identifying and expressing emotions healthily. Resources on CBT or DBT might be useful.", "tags": ["Difficulty Sharing Feelings", "General Depressive Symptoms", "Emotional Overwhelm/Anxiety", "Well-being Tips"]},
        "Support for Body Image Concerns": {"url": "Speak to a trusted adult, school counselor, or consider resources like 'The Body Project' (search online).", "tags": ["Body Image & Weight Concerns", "Well-being Tips"]},
        "Behavioral Strategies for Rule-Following": {"url": "Work with a trusted adult or counselor on understanding consequences and developing self-control.", "tags": ["Rule-Breaking/Defiance", "Well-being Tips"]},
        "Guidance on Impulse Control": {"url": "Seek support to develop strategies for thinking before acting.", "tags": ["Risky Behaviors", "Well-being Tips"]}
    },
    "For Parents/Guardians (School Dashboard only)": {
        "Parenting Mental Health Guide": {"url": "Search 'child mental health parent guide' from reputable organizations like WHO or UNICEF.", "tags": ["Parental Resources", "General"]},
        "Communicating with Teens": {"url": "Find resources on active listening and empathetic communication with adolescents.", "tags": ["Parental Resources", "Conduct/Aggression Issues", "General Depressive Symptoms"]}
    },
    "For Teachers/School Staff (School Dashboard only)": {
        "Recognizing Student Distress": {"url": "Training materials on identifying signs of mental health issues in students.", "tags": ["Teacher Resources", "General"]},
        "Creating a Supportive Classroom": {"url": "Strategies for fostering a positive and inclusive learning environment.", "tags": ["Teacher Resources", "General"]}
    }
}


# --- Function Definitions ---

def classify_risk(percent):
    if percent < 30:
        return "Low"
    elif 30 <= percent < 60:
        return "Moderate"
    else:
        return "High"

def personalized_guidance(row):
    guidance = []
    # Using the new granular categories
    if row["Emotional Overwhelm/Anxiety %"] > 60:
        guidance.append("⚠️ You seem to be struggling with emotional overwhelm or anxiety. Try relaxation techniques like deep breathing, yoga, or connecting with a trusted adult.")
    if row["Social/Loneliness Stress %"] > 60:
        guidance.append("🫂 Feelings of loneliness are detected. Reach out to friends, family, or a school counselor. Building social connections can help.")
    if row["General Depressive Symptoms %"] > 60:
        guidance.append("🧠 Signs of general depressive symptoms. Consider speaking with a trusted adult, school counselor, or exploring activities that bring you joy.")
    if row["Severe Depression/Crisis %"] > 0: # Even a small score here indicates a severe concern
        guidance.append("🚨 IMMEDIATE CONCERN: There are signs of severe depression or crisis. Please talk to a parent, teacher, school counselor, or a mental health helpline IMMEDIATELY. You are not alone.")
    if row["Disordered Eating Habits %"] > 60:
        guidance.append("🍽️ Concerns with eating habits detected. Focus on balanced eating, avoid restrictive diets, and consider talking to a nutritionist or school counselor for support.")
    if row["Body Image & Weight Concerns %"] > 60:
        guidance.append("🪞 Body image concerns are present. Focus on self-acceptance, avoid comparing yourself to others, and seek support from a counselor or trusted adult.")
    if row["Conduct/Aggression Issues %"] > 60:
        guidance.append("😠 Issues with conduct or aggression are noted. Seeking mentorship, participating in conflict resolution workshops, or talking to a trusted adult about managing anger can help.")
    if row["Rule-Breaking/Defiance %"] > 60:
        guidance.append("🚫 Tendencies towards rule-breaking or defiance are observed. Understanding consequences and developing self-control strategies can be beneficial. Speak to a trusted adult.")
    if row["Difficulty Sharing Feelings %"] > 60:
        guidance.append("💬 You find it difficult to share feelings. Practicing healthy emotional expression can help. Consider talking to a trusted adult or counselor.")
    if row["Risky Behaviors %"] > 0: # Even a small score here indicates a concern
        guidance.append("⚠️ Engaging in risky behaviors has been indicated. These can have serious consequences. Please talk to a trusted adult or counselor about safer choices and coping mechanisms.")
    if not guidance:
        return "✅ You're doing well! Keep practicing positive habits like staying active, connecting with friends, and pursuing hobbies for continued well-being."
    return " ".join(guidance)


def get_relevant_resources(student_data, mode="student"):
    """
    Filters MENTAL_HEALTH_RESOURCES based on the student's risk categories and dashboard mode.
    Now uses the more granular percentages.
    """
    relevant_tags = set(["General"]) # Always include general resources
    
    # Define thresholds
    MODERATE_RISK_THRESHOLD = 30
    HIGH_RISK_THRESHOLD = 60
    SEVERE_RISK_THRESHOLD = 80 # For very high risk categories in any specific area

    # Add tags based on granular category percentages
    if student_data["Emotional Overwhelm/Anxiety %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Emotional Overwhelm/Anxiety")
        relevant_tags.add("Well-being Tips")
    elif student_data["Emotional Overwhelm/Anxiety %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("Emotional Overwhelm/Anxiety")
        relevant_tags.add("Well-being Tips")
        
    if student_data["Social/Loneliness Stress %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Social/Loneliness Stress")
        relevant_tags.add("Well-being Tips") # Social tips included here

    if student_data["General Depressive Symptoms %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("General Depressive Symptoms")
        relevant_tags.add("Well-being Tips")
    elif student_data["General Depressive Symptoms %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("General Depressive Symptoms")
        relevant_tags.add("Well-being Tips")

    if student_data["Severe Depression/Crisis %"] > 0: # Any score indicates a need for crisis resources
        relevant_tags.add("Severe Depression/Crisis")
        relevant_tags.add("Crisis")
        relevant_tags.add("Suicidal Ideation") # Specific tag for Sneha India, etc.

    if student_data["Disordered Eating Habits %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Disordered Eating Habits")
        relevant_tags.add("Well-being Tips")
    elif student_data["Disordered Eating Habits %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("Disordered Eating Habits")
        relevant_tags.add("Well-being Tips")

    if student_data["Body Image & Weight Concerns %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Body Image & Weight Concerns")
        relevant_tags.add("Well-being Tips")
    elif student_data["Body Image & Weight Concerns %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("Body Image & Weight Concerns")
        relevant_tags.add("Well-being Tips")

    if student_data["Conduct/Aggression Issues %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Conduct/Aggression Issues")
        relevant_tags.add("Well-being Tips")
    elif student_data["Conduct/Aggression Issues %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("Conduct/Aggression Issues")
        relevant_tags.add("Well-being Tips")

    if student_data["Rule-Breaking/Defiance %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Rule-Breaking/Defiance")
        relevant_tags.add("Well-being Tips")
    elif student_data["Rule-Breaking/Defiance %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("Rule-Breaking/Defiance")
        relevant_tags.add("Well-being Tips")
        
    if student_data["Difficulty Sharing Feelings %"] >= HIGH_RISK_THRESHOLD:
        relevant_tags.add("Difficulty Sharing Feelings")
        relevant_tags.add("Well-being Tips")
    elif student_data["Difficulty Sharing Feelings %"] >= MODERATE_RISK_THRESHOLD:
        relevant_tags.add("Difficulty Sharing Feelings")
        relevant_tags.add("Well-being Tips")

    if student_data["Risky Behaviors %"] > 0: # Any score here warrants specific resources
        relevant_tags.add("Risky Behaviors")
        relevant_tags.add("Well-being Tips") # General guidance on choices
        relevant_tags.add("Conduct/Aggression Issues") # Overlap with general conduct issues

    # Add general tags based on overall mental health status if specific categories aren't high
    if student_data["Overall Mental Health Status"] == "High":
        relevant_tags.add("Crisis") # Ensure crisis lines are always there for high overall risk
        relevant_tags.add("Severe Depression/Crisis") # General high risk, direct to severe resources
        relevant_tags.add("Emotional Overwhelm/Anxiety")
        relevant_tags.add("General Depressive Symptoms")
    elif student_data["Overall Mental Health Status"] == "Moderate":
        relevant_tags.add("Well-being Tips")
        relevant_tags.add("Emotional Overwhelm/Anxiety")
        relevant_tags.add("General Depressive Symptoms")

    # Filter resources based on relevant tags and dashboard mode
    filtered_resources = {}
    for main_category, sub_resources in MENTAL_HEALTH_RESOURCES.items():
        # Handle mode-specific exclusions/inclusions
        if mode == "student" and ("For Parents/Guardians" in main_category or "For Teachers/School Staff" in main_category):
            continue # Skip these categories for student view
        
        # For school dashboard, only show general school resources directly from the main categories.
        # Student-specific granular resources are not for the general school dashboard view.
        if mode == "school" and not (
            "For Parents/Guardians" in main_category or 
            "For Teachers/School Staff" in main_category or 
            "Online Resources & Information" in main_category or 
            "India Helplines" in main_category or
            "Tips for Well-being" in main_category # Include well-being tips generally
        ):
            continue # Skip categories not explicitly for school general view

        filtered_sub_resources = {}
        for name, details in sub_resources.items():
            # For student mode, ensure tags match relevant tags from student's profile
            if mode == "student":
                if any(tag in relevant_tags for tag in details["tags"]):
                    filtered_sub_resources[name] = details["url"]
            # For school mode, filter to general/teacher/parent tags
            elif mode == "school":
                # Only include resources with "General", "Parental Resources", "Teacher Resources", "Well-being Tips"
                # or specific broad categories like "Crisis", "Policy", "Emotional Overwhelm/Anxiety", "General Depressive Symptoms"
                # but avoid highly specific student tags like "Suicidal Ideation", "Body Image & Weight Concerns", "Rule-Breaking/Defiance"
                # unless they also have a broader tag relevant for school staff.
                school_relevant_tags = set(["General", "Parental Resources", "Teacher Resources", "Well-being Tips", "Crisis", "Policy", "Emotional Overwhelm/Anxiety", "General Depressive Symptoms"])
                if any(tag in school_relevant_tags for tag in details["tags"]):
                    # Further refine: if a resource has a very specific student tag AND doesn't have a general school tag, skip it
                    if not (any(t in ["Suicidal Ideation", "Body Image & Weight Concerns", "Disordered Eating Habits", "Social/Loneliness Stress", "Conduct/Aggression Issues", "Rule-Breaking/Defiance", "Difficulty Sharing Feelings", "Risky Behaviors"] for t in details["tags"]) and not any(t in ["General", "Parental Resources", "Teacher Resources", "Well-being Tips", "Crisis"] for t in details["tags"])):
                        filtered_sub_resources[name] = details["url"]
        
        if filtered_sub_resources:
            filtered_resources[main_category] = filtered_sub_resources
            
    # Fallback if no specific categories were high but general category is low or moderate
    # This ensures something is always shown if risk is low/moderate and no specific high categories.
    if not filtered_resources and student_data["Overall Mental Health Status"] in ["Low", "Moderate"]:
        filtered_resources = {
            "General Well-being & Support": {
                "Mindfulness & Meditation Apps (Stress/Anxiety)": MENTAL_HEALTH_RESOURCES["Tips for Well-being"]["Mindfulness & Meditation Apps (Stress/Anxiety)"]["url"],
                "Yoga & Physical Activity Benefits": MENTAL_HEALTH_RESOURCES["Tips for Well-being"]["Yoga & Physical Activity Benefits"]["url"],
                "Healthy Eating for Mental Health": MENTAL_HEALTH_RESOURCES["Tips for Well-being"]["Healthy Eating for Mental Health"]["url"]
            }
        }
        # Add a general helpline too if nothing else.
        if "Tele MANAS (Mental Health Helpline)" in MENTAL_HEALTH_RESOURCES["India Helplines"]:
             filtered_resources["General Well-being & Support"]["Tele MANAS (Mental Health Helpline)"] = MENTAL_HEALTH_RESOURCES["India Helplines"]["Tele MANAS (Mental Health Helpline)"]["url"]


    return filtered_resources

def create_student_pdf(student_info, image_bytes, progress_image_bytes=None):
    pdf = fpdf.FPDF()
    pdf.add_page()
    try:
        font_path = os.path.join(os.path.dirname(__file__), 'fonts')
        if os.path.exists(os.path.join(font_path, "DejaVuSansCondensed.ttf")) and \
           os.path.exists(os.path.join(font_path, "DejaVuSansCondensed-Bold.ttf")):
            pdf.add_font("DejaVu", "", os.path.join(font_path, "DejaVuSansCondensed.ttf"), uni=True)
            pdf.add_font("DejaVu", "B", os.path.join(font_path, "DejaVuSansCondensed-Bold.ttf"), uni=True)
            pdf.set_font("DejaVu", size=12)
        else:
            print("DEBUG: PDF Font files not found in 'fonts/' directory. Using Arial.")
            pdf.set_font("Arial", size=12)
    except fpdf.FPDFException as e:
        print(f"DEBUG: PDF Font Error: {e}")
        pdf.set_font("Arial", size=12)


    pdf.cell(200, 10, text=f"Student ID: {student_info['SNO']}", ln=True, align='L')
    pdf.cell(200, 10, text=f"Overall Mental Health Status: {student_info['Overall Mental Health Status']}", ln=True, align='L')
    pdf.cell(200, 10, text=f"Mental Health Risk %: {student_info['Mental Health Risk %']:.2f}%", ln=True, align='L')
    pdf.cell(200, 10, text=f"Predicted Risk Class: {student_info['Predicted Risk Class']}", ln=True, align='L')

    pdf.ln(10)
    pdf.cell(200, 10, text="Disorder-wise Risk Percentages (Latest Assessment):", ln=True, align='L')
    
    # Updated to show granular categories
    granular_categories_for_pdf = [
        "Emotional Overwhelm/Anxiety", "Social/Loneliness Stress",
        "General Depressive Symptoms", "Severe Depression/Crisis",
        "Disordered Eating Habits", "Body Image & Weight Concerns",
        "Conduct/Aggression Issues", "Rule-Breaking/Defiance",
        "Difficulty Sharing Feelings", "Risky Behaviors"
    ]
    for category in granular_categories_for_pdf:
        # Only display if the column exists and has a value
        if category + ' %' in student_info and pd.notna(student_info[category + ' %']):
            pdf.cell(200, 10, text=f"{category}: {student_info[category + ' %']:.2f}%", ln=True, align='L')
        else:
            pdf.cell(200, 10, text=f"{category}: Data N/A", ln=True, align='L')


    pdf.ln(10)
    pdf.cell(200, 10, text="Suggested Guidance:", ln=True, align='L')
    pdf.multi_cell(190, 10, text=student_info['Suggested Guidance'], align='L')

    pdf.ln(10)
    pdf.cell(200, 10, text="Visualizations (Latest Assessment):", ln=True, align='L')
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp_file:
        tmp_file.write(image_bytes)
        temp_image_path = tmp_file.name

    try:
        pdf.image(temp_image_path, x=10, y=pdf.get_y(), w=150)
    except Exception as e:
        print(f"DEBUG: Error embedding main image in PDF: {e}")
    finally:
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)

    # Add progress trend image if available
    if progress_image_bytes:
        pdf.ln(10)
        pdf.cell(200, 10, text="Mental Health Progress Over Time:", ln=True, align='L')
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp_file_progress:
            tmp_file_progress.write(progress_image_bytes)
            temp_progress_image_path = tmp_file_progress.name
        try:
            pdf.image(temp_progress_image_path, x=10, y=pdf.get_y(), w=150)
        except Exception as e:
            print(f"DEBUG: Error embedding progress image in PDF: {e}")
        finally:
            if os.path.exists(temp_progress_image_path):
                os.remove(temp_progress_image_path)

    # --- Add RELEVANT resources to PDF ---
    pdf.add_page() # New page for resources
    pdf.set_font("DejaVu", "B", 14)
    pdf.cell(200, 10, text="Recommended Resources for Mental Well-being:", ln=True, align='C')
    pdf.ln(5)

    relevant_resources_for_pdf = get_relevant_resources(student_info, mode="student") # Pass mode
    if relevant_resources_for_pdf:
        for category, links in relevant_resources_for_pdf.items():
            pdf.set_font("DejaVu", "B", 12)
            pdf.cell(200, 10, text=category, ln=True, align='L')
            pdf.set_font("DejaVu", "", 10)
            for name, url in links.items():
                # Determine the original resource details to check for specific tags
                original_details = None
                for mc, sr in MENTAL_HEALTH_RESOURCES.items():
                    if name in sr and url == sr[name]["url"]:
                        original_details = sr[name]
                        break
                
                is_crisis_or_severe = original_details and ("Crisis" in original_details.get("tags", []) or "Suicidal Ideation" in original_details.get("tags", []))

                display_url = url
                if is_crisis_or_severe:
                    display_url = f"Please contact immediately: {url}"
                elif url.isdigit(): # Check if it's just a number, indicating a phone number
                    display_url = f"Call: {url}"
                pdf.multi_cell(190, 7, text=f"- {name}: {display_url}", align='L')
            pdf.ln(5)
    else:
        pdf.set_font("DejaVu", "", 10)
        pdf.multi_cell(190, 7, text="No specific high-risk areas identified, but general well-being resources are always recommended. Please contact your school counselor if you have any concerns.")

    return pdf.output(dest='S')

# --- Main Streamlit Application ---

st.set_page_config(layout="wide")
st.title("🧠 Student Mental Health Assessment Dashboard")

# --- Dashboard Mode Selection ---
st.sidebar.header("Select Dashboard Mode")
dash_mode = st.sidebar.radio("Choose dashboard:", ["Student", "School"])

# --- Google Form Link (visible on Student dashboard) ---
if dash_mode == "Student":
    GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1FGjnjXH7rwOoJs0NFQpjPrNFc3GX-UJ9jjT6vSPgCNU/viewform"  # Replace with your actual Google Form URL
    st.markdown(f"""
    <a href="{GOOGLE_FORM_URL}" target="_blank" style="text-decoration:none;">
        <button style="background-color:#4285F4;color:white;padding:10px 20px;border:none;border-radius:5px;font-size:16px;cursor:pointer;">
            ➕ Fill the Student Well-being Google Form
        </button>
    </a>
    """, unsafe_allow_html=True)
    st.markdown("---") # Separator

# --- Data Loading and Preprocessing ---
SHEET_URL_OR_KEY = "https://docs.google.com/spreadsheets/d/1CzlyhPSHraAa8HYKtMF3tOUCmSABqzurO_anRdvyUYE/edit?gid=2048584728" # Your Google Sheet URL
WORKSHEET_TITLE = "Form responses 1"

try:
    df_raw = fetch_google_sheet_as_df(SHEET_URL_OR_KEY, WORKSHEET_TITLE)
    if df_raw.empty:
        st.error("No data found in the Google Sheet. Please ensure the sheet is not empty and the URL/worksheet title is correct.")
        st.stop()
except Exception as e:
    st.error(f"Failed to load data from Google Sheet. Please check the URL and your internet connection. Error: {e}")
    st.stop()

df = df_raw.copy()

# Add SNO column for unique student numbering if it doesn't exist
if 'SNO' not in df.columns:
    df['SNO'] = range(1, len(df) + 1)

# Convert 'Timestamp' column to datetime
if 'Timestamp' in df.columns:
    df['Timestamp'] = pd.to_datetime(df['Timestamp'], errors='coerce')
    df.dropna(subset=['Timestamp'], inplace=True)
    df.sort_values(by=['SNO', 'Timestamp'], inplace=True)
else:
    st.warning("No 'Timestamp' column found. Progress tracking over time will not be available. Please ensure your Google Form collects timestamps.")

# Define risk score mapping for survey responses
risk_score_map = {
    "Always": 1.0, "Often": 0.75, "Sometimes": 0.5,
    "Rarely": 0.25, "Never": 0.0, "Not Sure": 0.5,
    "Skip": 0.0, # Treat 'Skip' as no issue for scoring specific questions
    "Yes": 1.0, "No": 0.0, "Neither": 0.5
}
# Special handling for "I feel satisfied with my eating habits" (inverse score)
# and "I feel satisfied with my personal life", "I feel satisfied with my school life", "I feel confident about my body image", "I feel happy"
inverse_score_map = {
    "Always": 0.0, "Often": 0.25, "Sometimes": 0.5,
    "Rarely": 0.75, "Never": 1.0, "Not Sure": 0.5,
    "Skip": 0.0, # Treat 'Skip' as no issue for scoring
    "Yes": 0.0, "No": 1.0, "Neither": 0.5 # For 'I hesitate to ask questions in class' (Yes is higher risk)
}
# Special handling for "I hesitate to ask questions in class" and "I give in to peer pressure to fit in", "I worry that people don't like me"
yes_is_high_risk_map = {
    "Yes": 1.0, "No": 0.0, "Sometimes": 0.5,
    "Always": 1.0, "Often": 0.75, "Sometimes": 0.5, "Rarely": 0.25, "Never": 0.0 # For 'Always/Often' responses where higher means higher risk
}

# Define granular disorder categories and their associated questions
# Mapping question titles from the survey PDF to meaningful categories.
# Using question numbers where possible, but mapping them to the full question string from the PDF.
granular_disorder_categories = {
    "Emotional Overwhelm/Anxiety": [
        "1. I feel overwhelmed by my emotions", # From Mental Health and Emotional Safety section [cite: 67]
        "2. I often feel anxious" # From Emotional Well-being section [cite: 45]
    ],
    "Social/Loneliness Stress": [
        "3. I often feel lonely or tearful", # From Emotional Well-being section [cite: 46]
        "14. I worry that people don't like me" # From Personal and Social Well-being section [cite: 17]
    ],
    "General Depressive Symptoms": [
        "2. I have felt hopeless or helpless recently", # From Mental Health and Emotional Safety section [cite: 67]
        "3. I feel like life is not worth living" # From Mental Health and Emotional Safety section [cite: 68]
    ],
    "Severe Depression/Crisis": [
        "4. I have thoughts of hurting myself" # From Mental Health and Emotional Safety section [cite: 68]
    ],
    "Disordered Eating Habits": [
        "2. I skip meals intentionally", # From Eating Habits & Body Image section [cite: 53]
        "3. I eat even when I’m not hungry due to stress or emotions", # From Eating Habits & Body Image section [cite: 53]
        "4. I feel guilty after eating", # From Eating Habits & Body Image section [cite: 54]
        "5. I avoid eating in front of others", # From Eating Habits & Body Image section [cite: 55]
        "8. I restrict food intake to control my weight", # From Eating Habits & Body Image section [cite: 57]
    ],
    "Body Image & Weight Concerns": [
        "6. I worry excessively about gaining weight", # From Eating Habits & Body Image section [cite: 56]
        "7. I feel pressure to look a certain way because of social media or peers", # From Eating Habits & Body Image section [cite: 56]
        "6. I feel confident about my body image" # From Personal and Social Well-being section (inverse score) [cite: 13]
    ],
    "Conduct/Aggression Issues": [
        "6. I get into fights with my classmates or friends", # From Emotional Well-being section [cite: 47]
        # From '6. I take part in risky activities' section[cite: 70]:
        "Bullying or getting into fights", # This is a sub-question under "6. I take part in risky activities"
        "Using weapons or carrying dangerous objects that could hurt others" # This is a sub-question under "6. I take part in risky activities"
    ],
    "Rule-Breaking/Defiance": [
        "7. I skip school or classes without a good reason", # From Emotional Well-being section [cite: 48]
        "8. I tend to lie or hide the truth to avoid trouble", # From Emotional Well-being section [cite: 49]
        "9. I have trouble following rules or instructions", # From Emotional Well-being section [cite: 49]
        # From '6. I take part in risky activities' section[cite: 70]:
        "Skipping classes", # Sub-question
        "Avoiding homework or assignments intentionally", # Sub-question
        "Stealing or shoplifting", # Sub-question
        "Running away from home" # Sub-question
    ],
    "Difficulty Sharing Feelings": [
        "5. I find it difficult to share my feelings with others" # From Mental Health and Emotional Safety section [cite: 69]
    ],
    "Risky Behaviors": [ # This will be derived from the multi-select question "6. I take part in risky activities" [cite: 70]
        # The value for this category will be based on the count of risky activities selected
        "Engaging in unsafe actions (e.g., reckless behavior, unsafe stunts)",
        "Experimenting with substances – I try alcohol, smoking, or other substances",
        "Driving without a license"
    ]
}

# Calculate granular percentages
all_risk_percentage_cols = []

for disorder, questions in granular_disorder_categories.items():
    current_disorder_scores = []
    
    # Handle multi-select questions (like "6. I take part in risky activities") differently
    if disorder == "Risky Behaviors":
        # Check if the main question for risky activities exists. It's listed as Q70 in the PDF.
        main_risky_q = "6. I take part in risky activities *" # Full question title [cite: 71]
        
        # Check if this column exists in the dataframe
        if main_risky_q in df.columns:
            # For multi-select, responses come as a string with semicolon-separated values
            # or NaN if nothing selected.
            df['risky_behavior_count'] = df[main_risky_q].apply(
                lambda x: len(str(x).split(';')) if pd.notna(x) and str(x).strip() != 'Skip' else 0
            )
            # Normalize the count to a percentage. Max possible options is 9 for Q70 [cite: 70]
            max_risky_options = 9 # Based on count of items listed under Q70 [cite: 70]
            df[disorder + " %"] = (df['risky_behavior_count'] / max_risky_options) * 100
            all_risk_percentage_cols.append(disorder + " %")
        else:
            df[disorder + " %"] = 0.0 # If column not found, set to 0
            st.warning(f"Column '{main_risky_q}' not found for '{disorder}'. Setting score to 0%.")
        continue # Move to next disorder category

    # Handle single-choice questions (Likert scale or Yes/No)
    relevant_questions_for_disorder = []
    for q in questions:
        # Check if the question is in the DataFrame's columns
        if q in df.columns:
            relevant_questions_for_disorder.append(q)
        else:
            print(f"Warning: Question '{q}' not found in DataFrame for category '{disorder}'. It will be skipped.")

    if relevant_questions_for_disorder:
        temp_df = df[relevant_questions_for_disorder].copy()
        
        # Apply appropriate mapping
        for col in temp_df.columns:
            if col == "1. I feel satisfied with my eating habits" or \
               col == "6. I feel confident about my body image" or \
               col == "1. I feel satisfied with my personal life" or \
               col == "2. I often feel happy" or \
               col == "4. I feel hopeful during stressful situations" or \
               col == "3. I feel satisfied with my school life": # Added based on survey review [cite: 9, 10, 12, 44, 45]
                temp_df[col] = temp_df[col].apply(lambda x: inverse_score_map.get(str(x).strip(), 0.5))
            elif col == "11. I hesitate to ask questions in class" or \
                 col == "13. I give in to peer pressure to fit in" or \
                 col == "14. I worry that people don't like me": # Added based on survey review [cite: 14, 17, 20]
                 temp_df[col] = temp_df[col].apply(lambda x: yes_is_high_risk_map.get(str(x).strip(), 0.5))
            else:
                temp_df[col] = temp_df[col].apply(lambda x: risk_score_map.get(str(x).strip(), 0.5))

        df[disorder + " %"] = temp_df.mean(axis=1) * 100
        all_risk_percentage_cols.append(disorder + " %")
    else:
        df[disorder + " %"] = 0.0 # If no questions for category, set to 0

# Calculate overall risk and status columns based on the new granular percentages
if all_risk_percentage_cols:
    df["Mental Health Risk %"] = df[all_risk_percentage_cols].mean(axis=1)
else:
    df["Mental Health Risk %"] = 0.0

df["Mental Health Category"] = df["Mental Health Risk %"].apply(classify_risk)

# Machine Learning Model for Prediction (using the granular percentages as features)
le = LabelEncoder()
df_trainable = df.dropna(subset=['Mental Health Category'])

# Select all granular percentage columns for X
X_cols_for_ml = [col for col in df.columns if col.endswith(" %") and col != "Mental Health Risk %"]
X = df_trainable[X_cols_for_ml]
y = df_trainable["Mental Health Category"] # Use the string labels directly for LabelEncoder

if len(X) > 1 and len(df_trainable["Mental Health Category"].unique()) > 1: # Ensure enough data and distinct classes
    df_trainable["Mental Health Category Encoded"] = le.fit_transform(df_trainable["Mental Health Category"])
    y_encoded = df_trainable["Mental Health Category Encoded"]

    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
    clf_model = RandomForestClassifier(random_state=42)
    clf_model.fit(X_train, y_train)

    df["Predicted Risk Class Encoded"] = pd.Series(index=df.index, dtype='float64')
    # Make sure to align predictions back to the original full dataframe
    df.loc[df_trainable.index, "Predicted Risk Class Encoded"] = clf_model.predict(X)
    df["Predicted Risk Class"] = df["Predicted Risk Class Encoded"].apply(
        lambda x: le.inverse_transform([int(x)])[0] if pd.notna(x) else None
    )
else:
    df["Predicted Risk Class"] = df["Mental Health Category"]
    st.warning("Not enough distinct data points or classes for ML model training. 'Predicted Risk Class' is currently based on 'Mental Health Category'.")

df["Overall Mental Health Status"] = df["Mental Health Risk %"].apply(classify_risk)
df["Suggested Guidance"] = df.apply(personalized_guidance, axis=1)

# Find the class/grade column
class_col = None
for col in df.columns:
    if col.lower() in ["class", "grade", "current grade/class"]: # "Current Grade/Class" from PDF [cite: 6]
        class_col = col
        break

# Find the gender column
gender_col = None
for col in df.columns:
    if col.lower() == "gender": # "Gender" from PDF [cite: 2]
        gender_col = col
        break

# --- Dashboard Logic ---
if dash_mode == "Student":
    st.sidebar.title("📋 Individual Student Report")

    filtered_df_for_student_display = df.copy()
    selected_class = None
    if class_col and not df[class_col].empty:
        class_list = sorted(df[class_col].dropna().unique())
        if class_list:
            selected_class = st.sidebar.selectbox(f"Select {class_col}", class_list, key='student_class_selectbox')
            filtered_df_for_student_display = df[df[class_col] == selected_class].copy()
        else:
            st.sidebar.info(f"No classes found in '{class_col}' column for selection.")
            filtered_df_for_student_display = df
    else:
        filtered_df_for_student_display = df

    if 'SNO' in filtered_df_for_student_display.columns and not filtered_df_for_student_display.empty:
        student_ids = sorted(filtered_df_for_student_display['SNO'].unique())
        if student_ids:
            selected_student_sno = st.sidebar.selectbox("Select Student ID (SNO)", student_ids, key='student_selectbox')

            student_all_entries = df[df['SNO'] == selected_student_sno].sort_values(by='Timestamp', ascending=True)
            student_data = student_all_entries.iloc[-1]

            st.subheader(f"🧾 Student Report for ID {selected_student_sno} (Latest Assessment)")
            if class_col and pd.notna(student_data[class_col]):
                st.write(f"**{class_col}**: {student_data[class_col]}")
            st.write(f"**Overall Mental Health Status**: {student_data['Overall Mental Health Status']}")
            st.write(f"**Mental Health Risk %**: {student_data['Mental Health Risk %']:.2f}%")
            st.write(f"**Predicted Risk Class**: {student_data['Predicted Risk Class']}")
            st.write(f"**Suggested Guidance**: {student_data['Suggested Guidance']}")

            st.markdown("### 📊 Comparison with Class Averages")
            # Using granular categories for comparison
            categories_for_display = [
                "Emotional Overwhelm/Anxiety", "Social/Loneliness Stress",
                "General Depressive Symptoms", "Severe Depression/Crisis",
                "Disordered Eating Habits", "Body Image & Weight Concerns",
                "Conduct/Aggression Issues", "Rule-Breaking/Defiance",
                "Difficulty Sharing Feelings", "Risky Behaviors"
            ]
            
            # Ensure categories exist in student_data and filtered_df_for_student_display
            valid_categories = [
                cat for cat in categories_for_display 
                if (cat + " %" in student_data and pd.notna(student_data[cat + " %"])) and
                   (cat + " %" in filtered_df_for_student_display.columns and not filtered_df_for_student_display[cat + " %"].isnull().all())
            ]

            if valid_categories:
                comparison_df = pd.DataFrame({
                    "Category": valid_categories,
                    "Student (Latest)": [student_data[cat + " %"] for cat in valid_categories],
                    "Class Average": [filtered_df_for_student_display[cat + " %"].mean() for cat in valid_categories]
                })

                comparison_df.set_index("Category", inplace=True)
                st.dataframe(comparison_df.style.format("{:.2f}"))

                fig_current_status, ax_current_status = plt.subplots(figsize=(10, 8)) # Increased size for more categories
                x = range(len(valid_categories))
                ax_current_status.barh(x, comparison_df["Student (Latest)"], height=0.4, label="Student (Latest)", color="skyblue")
                ax_current_status.barh([i + 0.4 for i in x], comparison_df["Class Average"], height=0.4, label="Class Avg", color="orange")
                ax_current_status.set_yticks([i + 0.2 for i in x])
                ax_current_status.set_yticklabels(valid_categories)
                ax_current_status.set_xlabel("Risk Percentage")
                ax_current_status.set_title(f"Student vs Class Average for Student {selected_student_sno}")
                ax_current_status.legend()
                plt.tight_layout()

                buf_current_status = BytesIO()
                plt.savefig(buf_current_status, format="png")
                plt.close(fig_current_status)
                img_bytes_current_status = buf_current_status.getvalue()
                st.pyplot(fig_current_status) # Display the plot

            else:
                st.info("Not enough data to generate category-wise comparison charts.")
                img_bytes_current_status = None # No image to pass to PDF

            progress_image_bytes = None
            if 'Timestamp' in student_all_entries.columns and len(student_all_entries) > 1:
                st.markdown("### 📈 Your Mental Health Progress Over Time")
                fig_progress, ax_progress = plt.subplots(figsize=(10, 6))
                sns.lineplot(data=student_all_entries, x='Timestamp', y='Mental Health Risk %', marker='o', ax=ax_progress)
                ax_progress.set_title(f"Mental Health Risk Trend for Student {selected_student_sno}")
                ax_progress.set_xlabel("Date of Assessment")
                ax_progress.set_ylabel("Overall Mental Health Risk %")
                ax_progress.set_ylim(0, 100)
                ax_progress.grid(True)
                plt.xticks(rotation=45)
                plt.tight_layout()

                buf_progress = BytesIO()
                plt.savefig(buf_progress, format="png")
                plt.close(fig_progress)
                progress_image_bytes = buf_progress.getvalue()
                st.pyplot(fig_progress)
            elif 'Timestamp' not in df.columns:
                st.info("To enable progress tracking, ensure your Google Form collects 'Timestamp' data.")
            else:
                st.info(f"Only one assessment found for Student {selected_student_sno}. Submit more forms to see progress over time!")

            st.markdown("### 🧩 Student-Friendly Visualizations")

            # Using granular categories for pie and heatmap
            if valid_categories: # Reuse valid_categories from comparison
                pie_labels = valid_categories
                pie_values = [student_data[cat + " %"] for cat in valid_categories]
                pie_colors = sns.color_palette("pastel", len(valid_categories))
                fig1, ax1 = plt.subplots(figsize=(8,8)) # Adjusted size
                ax1.pie(pie_values, labels=pie_labels, autopct='%1.1f%%', startangle=90, colors=pie_colors)
                ax1.axis('equal')
                ax1.set_title("Your Mental Health Focus Areas")
                st.pyplot(fig1)
                plt.close(fig1)

                st.markdown("#### 🔥 Risk Heatmap")
                heat_df = pd.DataFrame([pie_values], columns=valid_categories, index=["Your Risk"])
                fig2, ax2 = plt.subplots(figsize=(12, 4)) # Adjusted size for readability
                sns.heatmap(heat_df, annot=True, cmap="Reds", fmt=".1f", ax=ax2, cbar_kws={'label': 'Risk %'})
                ax2.set_title("Visualizing Your Risk Across Categories")
                st.pyplot(fig2)
                plt.close(fig2)

                st.markdown("#### 📈 Your Risk Compared to Class")
                class_avg_for_plot = {cat: filtered_df_for_student_display[cat + " %"].mean() for cat in valid_categories}
                trend_df = pd.DataFrame({
                    "Category": valid_categories,
                    "Your Score": pie_values,
                    "Class Average": list(class_avg_for_plot.values())
                }).melt(id_vars="Category", var_name="Type", value_name="Percentage")

                fig3, ax3 = plt.subplots(figsize=(12, 6)) # Adjusted size
                sns.barplot(data=trend_df, x="Category", y="Percentage", hue="Type", palette="Set2", ax=ax3)
                ax3.set_title("Your Scores vs. Class Average")
                ax3.set_ylim(0, 100)
                plt.xticks(rotation=45, ha='right') # Rotate labels for better readability
                plt.tight_layout()
                st.pyplot(fig3)
                plt.close(fig3)
            else:
                st.info("Not enough data to generate detailed mental health focus area visualizations.")


            # --- Recommended Resources for Student (NOW FILTERED) ---
            st.markdown("### 📚 Recommended Resources for Your Well-being")
            
            # Get relevant resources based on student's current status for the dashboard
            relevant_dashboard_resources = get_relevant_resources(student_data, mode="student")

            if relevant_dashboard_resources:
                for category, links in relevant_dashboard_resources.items():
                    st.subheader(f"• {category}")
                    for name, url in links.items():
                        # Determine the original resource details to check for specific tags
                        original_details = None
                        for mc, sr in MENTAL_HEALTH_RESOURCES.items():
                            if name in sr and url == sr[name]["url"]:
                                original_details = sr[name]
                                break
                        
                        is_crisis_or_severe = original_details and ("Crisis" in original_details.get("tags", []) or "Suicidal Ideation" in original_details.get("tags", []))

                        if url.isdigit(): # Check if it's just a number, indicating a phone number
                            if is_crisis_or_severe:
                                st.markdown(f"- **{name}**: **_Please contact immediately_**: Call <a href='tel:{url}'>{url}</a>", unsafe_allow_html=True)
                            else:
                                st.markdown(f"- **{name}**: Call <a href='tel:{url}'>{url}</a>", unsafe_allow_html=True)
                        else:
                            if is_crisis_or_severe:
                                st.markdown(f"- **{name}**: **_Please contact immediately_**: [Click Here]({url})", unsafe_allow_html=True)
                            else:
                                st.markdown(f"- **{name}**: [Click Here]({url})", unsafe_allow_html=True)
            else:
                st.info("No specific high-risk areas identified. General well-being resources are always recommended. Please contact your school counselor if you have any concerns.")


            # Download PDF report
            # Only generate PDF if img_bytes_current_status was successfully created
            if img_bytes_current_status:
                pdf_bytes = create_student_pdf(student_data, img_bytes_current_status, progress_image_bytes)
                base64_pdf = base64.b64encode(pdf_bytes).decode('utf-8')
                href = f'<a href="data:application/pdf;base64,{base64_pdf}" download="Student_{selected_student_sno}_Report.pdf">📄 Download Individual Report (PDF)</a>'
                st.markdown(href, unsafe_allow_html=True)
            else:
                st.warning("PDF report generation skipped as current status visualization could not be created.")

        else:
            st.info("No student IDs found for the selected class. Please ensure your Google Sheet has data for this class and that students have an 'SNO'.")
    else:
        st.info("No student data available for the selected class, or 'SNO' column is missing or empty. Please ensure your Google Sheet has data for this class and students have an 'SNO'.")


elif dash_mode == "School":
    st.header("🏫 School Dashboard & Analytics")

    # --- Early Warning System Section ---
    st.markdown("## 🚨 Students Needing Immediate Attention")
    # Identify students with high scores in 'Severe Depression/Crisis %' or 'Risky Behaviors %'
    severe_crisis_students = df[(df['Severe Depression/Crisis %'] > 0) | (df['Risky Behaviors %'] > 0)]

    if not severe_crisis_students.empty:
        st.warning("The following students are identified with severe concerns (crisis/risky behaviors) and may require immediate attention:")
        st.dataframe(severe_crisis_students[['SNO', 'Predicted Risk Class', 'Severe Depression/Crisis %', 'Risky Behaviors %', 'Suggested Guidance']].set_index('SNO').style.format({"Severe Depression/Crisis %": "{:.2f}", "Risky Behaviors %": "{:.2f}"}))
        st.info("Please reach out to these students and consider connecting them with school counselors or external mental health professionals IMMEDIATELY.")
    else:
        st.success("No students currently identified with severe crisis or risky behaviors. Keep monitoring!")

    # Also show general high risk students (excluding those already in severe_crisis_students)
    high_risk_students_general = df[(df['Overall Mental Health Status'] == 'High') & ~df['SNO'].isin(severe_crisis_students['SNO'])]
    if not high_risk_students_general.empty:
        st.warning("The following students are identified as 'High' overall risk (excluding severe crisis/risky behavior students):")
        st.dataframe(high_risk_students_general[['SNO', 'Predicted Risk Class', 'Mental Health Risk %', 'Suggested Guidance']].set_index('SNO').style.format({"Mental Health Risk %": "{:.2f}"}))
        st.info("These students warrant close monitoring and proactive support.")
    elif severe_crisis_students.empty: # Only if no severe crisis students are found
        st.success("No students currently identified in the 'High Risk' category. Keep monitoring!")

    st.markdown("---") # Separator

    # --- Teacher Resources Section ---
    st.markdown("## 👩‍🏫👨‍🏫 Teacher Resources: Supporting Student Mental Well-being")
    with st.expander("Click here for guidance and tips for teachers"):
        st.markdown("""
        Teachers play a vital role in student well-being. Here's how you can help:

        ### **Spotting the Signs:**
        Look out for changes in student behavior, mood, or academic performance. These could be subtle indicators of mental health challenges:
        * **Emotional Overwhelm/Anxiety:** Persistent worry, difficulty concentrating, irritability, panic.
        * **Social/Loneliness Stress:** Withdrawal from friends, tearfulness, expressions of loneliness, difficulty engaging.
        * **Depressive Symptoms:** Loss of interest, persistent sadness, low energy, changes in sleep or appetite.
        * **Eating Concerns:** Sudden weight changes, preoccupation with food/body, avoidance of eating with others.
        * **Behavioral Shifts:** Increased aggression, defiance, lying, rule-breaking, difficulty with emotional control.
        * **Risky Behaviors:** Engaging in unsafe activities, substance experimentation, self-harm ideation (seek immediate help).

        ### **Simple Classroom Support (What Teachers Can Do):**
        Creating a supportive classroom environment can make a big difference.
        * **Build Relationships:** Greet students, learn their names, and show genuine interest in their well-being.
        * **Promote Openness:** Encourage a classroom culture where students feel safe to express feelings (within appropriate boundaries).
        * **Mindfulness Breaks:** Lead short breathing exercises or quiet moments to help students manage stress.
        * **Encourage Hobbies & Balance:** Remind students about the importance of extracurricular activities and rest, not just studies.
        * **Active Listening:** If a student approaches you, listen without judgment, even if you don't have all the answers.
        * **Be a Role Model:** Show your own healthy coping strategies.

        ### **When to Get Help (Who to Contact at School):**
        It's important to know when to involve trained professionals.
        * **Immediate Concern:** If a student expresses thoughts of self-harm or harm to others, or is engaging in dangerous risky behaviors, seek immediate help from the school counselor or principal.
        * **Ongoing Concerns:** If you notice persistent changes in a student's behavior or mood, or if a student confides in you about struggles, gently encourage them to speak with the school counselor.
        * **Referral Process:** Familiarize yourself with your school's specific referral process for mental health support.
        * **School Counselor/Wellness Teacher:** This is your primary contact for student mental health concerns. They are trained to provide support and connect students with further help if needed.
        * **Parent/Guardian Communication:** In consultation with school leadership and counselors, decide on appropriate communication with parents/guardians about student well-being concerns.
        """)

    st.markdown("---") # Separator

    st.subheader("📊 Overall School Mental Health Analytics")
    st.markdown("Download the full assessment data and explore analytics by gender, class, or overall school.")

    # Download CSV button
    st.download_button(
        label="Download Full Assessment Report as CSV",
        data=df.to_csv(index=False).encode('utf-8'),
        file_name='school_mental_health_report.csv',
        mime='text/csv'
    )

    # Filter options for school analytics
    filtered_df_school_analytics = df.copy()

    filter_type = st.selectbox("Analyze by:", ["Overall School", "Gender", "Class"], key='school_filter_type')

    if filter_type == "Gender" and gender_col and not df[gender_col].empty:
        genders = df[gender_col].dropna().unique()
        if genders.size > 0:
            selected_gender = st.selectbox("Select Gender", genders, key='school_gender_selectbox')
            filtered_df_school_analytics = df[df[gender_col] == selected_gender]
        else:
            st.info(f"No gender data available in '{gender_col}' column for filtering.")
    elif filter_type == "Class" and class_col and not df[class_col].empty:
        classes = df[class_col].dropna().unique()
        if classes.size > 0:
            selected_class = st.selectbox("Select Class", classes, key='school_class_selectbox')
            filtered_df_school_analytics = df[df[class_col] == selected_class]
        else:
            st.info(f"No class data available in '{class_col}' column for filtering.")

    # Show summary statistics and visualizations for the filtered school data
    if not filtered_df_school_analytics.empty:
        st.subheader(f"Summary Statistics ({filter_type})")
        # Use granular categories for summary statistics
        granular_categories_for_summary = [
            "Emotional Overwhelm/Anxiety", "Social/Loneliness Stress",
            "General Depressive Symptoms", "Severe Depression/Crisis",
            "Disordered Eating Habits", "Body Image & Weight Concerns",
            "Conduct/Aggression Issues", "Rule-Breaking/Defiance",
            "Difficulty Sharing Feelings", "Risky Behaviors"
        ]
        # Ensure only existing columns are used for mean calculation
        valid_cols_for_summary = [cat + " %" for cat in granular_categories_for_summary if cat + " %" in filtered_df_school_analytics.columns]

        if valid_cols_for_summary:
            summary_data = {
                "Category": [col.replace(' %', '') for col in valid_cols_for_summary],
                "Average Risk %": [filtered_df_school_analytics[col].mean() for col in valid_cols_for_summary]
            }
            summary_df = pd.DataFrame(summary_data)
            summary_df["Average Risk %"] = pd.to_numeric(summary_df["Average Risk %"], errors='coerce')
            st.dataframe(summary_df.style.format({"Average Risk %": "{:.2f}"}))

            # Visualizations for school
            fig_school, ax_school = plt.subplots(figsize=(12, 7)) # Adjusted size
            sns.barplot(data=summary_df, x="Category", y="Average Risk %", palette="viridis", ax=ax_school)
            ax_school.set_title(f"Average Mental Health Risk by Category ({filter_type})")
            ax_school.set_ylim(0, 100)
            plt.xticks(rotation=45, ha='right') # Rotate labels for better readability
            plt.tight_layout()
            st.pyplot(fig_school)
            plt.close(fig_school)
        else:
            st.info("No valid granular mental health category data found for summary statistics.")


        # Distribution of overall risk categories
        st.subheader(f"Distribution of Mental Health Risk Categories ({filter_type})")
        risk_category_counts = filtered_df_school_analytics['Overall Mental Health Status'].value_counts(normalize=True) * 100
        fig_pie, ax_pie = plt.subplots(figsize=(8, 8))
        ax_pie.pie(risk_category_counts, labels=risk_category_counts.index, autopct='%1.1f%%', startangle=90, colors=sns.color_palette("coolwarm"))
        ax_pie.axis('equal')
        st.pyplot(fig_pie)
        plt.close(fig_pie)

        # --- General Useful Resources for School ---
        st.markdown("---")
        st.markdown("## 📚 General Useful Resources for the School Community")
        
        # Filter for school dashboard specific resources
        school_dashboard_resources = {}
        for main_cat, sub_res in MENTAL_HEALTH_RESOURCES.items():
            # Include categories explicitly for school/general use
            if "For Parents/Guardians" in main_cat or \
               "For Teachers/School Staff" in main_cat or \
               "Online Resources & Information" in main_cat or \
               "India Helplines" in main_cat or \
               "Tips for Well-being" in main_cat: # Include general well-being tips
                
                temp_sub_res = {}
                for name, details in sub_res.items():
                    # Exclude very specific student-level therapeutic tags from general school view
                    # unless they also have a broader tag like "General", "Well-being Tips", "Crisis"
                    specific_student_tags = [
                        "Suicidal Ideation", "Body Image & Weight Concerns", "Disordered Eating Habits",
                        "Social/Loneliness Stress", "Conduct/Aggression Issues", "Rule-Breaking/Defiance",
                        "Difficulty Sharing Feelings", "Risky Behaviors"
                    ]
                    
                    if not (any(t in specific_student_tags for t in details["tags"]) and 
                            not any(t in ["General", "Well-being Tips", "Crisis", "Teacher Resources", "Parental Resources"] for t in details["tags"])):
                        temp_sub_res[name] = details["url"]
                if temp_sub_res:
                    school_dashboard_resources[main_cat] = temp_sub_res

        if school_dashboard_resources:
            for category, links in school_dashboard_resources.items():
                st.subheader(f"• {category}")
                for name, url in links.items():
                    if url.isdigit():
                        st.markdown(f"- **{name}**: Call <a href='tel:{url}'>{url}</a>", unsafe_allow_html=True)
                    else:
                        st.markdown(f"- **{name}**: [Click Here]({url})", unsafe_allow_html=True)
        else:
            st.info("No general school resources available or tagged correctly for this view.")

    else:
        st.info("No data available for the selected filter criteria for school analytics. Please ensure data exists for the chosen gender/class.")