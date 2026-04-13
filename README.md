# Texas Health Hackathon Project

This repository contains the web-based health screening application.

## Directory Structure
- `app/frontend`: Next.js web application
- `app/backend`: Backend services (API, core algorithms)
- `models`: Machine learning models (CNNs, LLMs)
- `data`: Training and evaluation datasets
- `notebooks`: Jupyter notebooks for exploratory data analysis
- `docs`: Documentation and specification files

## Azure Deployment Specifications

- **Service:** Azure App Service (Web App)
- **Publish Method:** Code
- **Operating System:** Linux
- **Runtime Stack:** Node 22 LTS (or Node 20 LTS, matching our `package.json` requirements)
- **Pricing Plan:** Basic B1 (Utilizing Azure for Students credit)

### Critical App Configurations

- **Startup Command:** Because our Next.js app is located in a subfolder, the Azure configuration under *Settings > Configuration > General settings > Startup Command* MUST be set exactly to: `cd app/frontend && npm start`
- **GitHub Secrets:** To enable the CI/CD pipeline, the Azure Publish Profile XML must be downloaded and saved in the GitHub repository secrets as `AZURE_WEBAPP_PUBLISH_PROFILE`.
