import express from 'express';
import puppeteer from 'puppeteer-core';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const routes = express.Router();

// ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
//     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

routes.get('/events', async (req, res) => {
    const ingressoDigital = 'https://www.ingressodigital.com/list.php?busca=S&txt_busca=Vit%C3%B3ria&txt_busca_m=';

    let browser;
    try {
        browser = await puppeteer.launch({
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--no-zygote",
            ],
            executablePath: '/usr/bin/google-chrome-stable',
               
            // executablePath: process.env.NODE_ENV === 'production' 
            //     ? process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable' // Use env var or default
            //     : puppeteer.executablePath(),
            headless: true,
        });
    
        const page = await browser.newPage();
    
        await page.goto(ingressoDigital);
    
        const textContents = await page.$$eval('.col-6', divs => {
            return divs.map(div => div.textContent?.trim());
        });
    
        await browser.close();
    
        return res.json({ textContents });
    } catch (error) {
        console.error('Error during Puppeteer operation:', error);
        if (browser) await browser.close(); // Close the browser in case of error
        return res.status(500).json({ error: 'An error occurred during processing.' });
    }
});

export default routes;
