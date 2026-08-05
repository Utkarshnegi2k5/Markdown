# Import Path to work with files and folders
from pathlib import Path

# Import yaml to generate docs.yml
import yaml


# ----------------------------
# Configuration
# ----------------------------

# Docs folder is INSIDE fern folder
DOCS_DIR = Path("docs")

# Current folder (because script is inside fern/)
FERN_DIR = Path(".")

# Output file
DOCS_YML = FERN_DIR / "docs.yml"

# Fern site URL
SITE_URL = "https://markdown-584283.docs.buildwithfern.com"

# Website title
TITLE = "Markdown Documentation"


# ----------------------------
# Helper Function
# ----------------------------

def prettify(name: str):
    """
    Convert

    getting-started

    into

    Getting Started
    """

    return name.replace("-", " ").replace("_", " ").title()


# Navigation list
navigation = []


# ----------------------------
# Home Page
# ----------------------------

home = DOCS_DIR / "index.md"

if home.exists():

    navigation.append({
        "section": "Introduction",
        "contents": [
            {
                "page": "Home",
                "path": "docs/index.md"
            }
        ]
    })


# Dictionary to store sections
sections = {}


# ----------------------------
# Scan Markdown Files
# ----------------------------

for file in DOCS_DIR.rglob("*.md"):

    # Ignore Home page
    if file.name == "index.md":
        continue

    # Example:
    #
    # docs/authentication/login.md
    #
    # becomes
    #
    # authentication/login.md

    relative = file.relative_to(DOCS_DIR)

    # Decide section

    if len(relative.parts) == 1:

        section = "Guides"

    else:

        section = prettify(relative.parts[0])

    # installation.md
    #
    # becomes
    #
    # Installation

    page = prettify(file.stem)

    # Build markdown path
    #
    # authentication/login.md
    #
    # becomes
    #
    # docs/authentication/login.md

    path = "docs/" + relative.as_posix()

    # Add page

    sections.setdefault(section, []).append({

        "page": page,

        "path": path

    })


# ----------------------------
# Sort Navigation
# ----------------------------

for section in sorted(sections):

    navigation.append({

        "section": section,

        "contents": sorted(

            sections[section],

            key=lambda page: page["page"]

        )

    })


# ----------------------------
# Build YAML
# ----------------------------

docs = {

    "instances": [

        {
            "url": SITE_URL
        }

    ],

    "title": TITLE,

    "navigation": navigation,

    "colors": {

        "accentPrimary": "#4F46E5",

        "background": "#0F172A"

    }

}


# ----------------------------
# Write docs.yml
# ----------------------------

with open(DOCS_YML, "w") as file:

    yaml.dump(

        docs,

        file,

        sort_keys=False,

        allow_unicode=True

    )


print("✅ docs.yml generated successfully!")