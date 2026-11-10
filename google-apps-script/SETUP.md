# Connect the PWI registration form

The destination sheet is already created: https://docs.google.com/spreadsheets/d/1HYj6NVoXOOhK41lCvF_jsdLu6XLzdy0xtOe3f5sWVdk/edit

1. Visit [Google Apps Script](https://script.new) while signed into the Google account that owns the sheet.
2. Replace the starter code with the contents of `Code.gs`, then save the project as `PWI registration endpoint`.
3. Select **Deploy → New deployment → Web app**. Set **Execute as** to **Me** and **Who has access** to **Anyone**. Authorize the requested Google permissions, then deploy.
4. Copy the web-app URL that ends in `/exec` and send it here. It will be added to the landing page configuration.

The web app only records the fields shown in the registration form. Do not store passwords, identity documents, financial details, or other sensitive information in this form.
