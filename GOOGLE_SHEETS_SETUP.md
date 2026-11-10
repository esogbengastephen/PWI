# Activate Google Sheets registrations

The PWI registration form sends valid entries to the Google Apps Script web app, which adds them to the `Registrations` tab in the PWI Registrations spreadsheet.

1. Open the Apps Script project that contains [Code.gs](google-apps-script/Code.gs).
2. Confirm that `SPREADSHEET_ID` and `SHEET_NAME` match the destination spreadsheet and the `Registrations` tab.
3. Choose **Deploy → Manage deployments**, edit the Web app deployment, then deploy a new version. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
4. Copy the public deployment URL ending in `/exec`.
5. Add it to `.env.local` on the computer hosting the website:

   ```env
   GOOGLE_APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/your-deployment-id/exec
   ```

6. Add the same variable to your production website host’s encrypted environment variables, then redeploy the website.

Do not use an Apps Script `/library/` URL; it cannot receive website registrations. Test the `/exec` URL in a private browser window: it should show a JSON message that the endpoint is ready.
