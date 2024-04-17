import express from 'express';
import puppeteer from 'puppeteer-core'; // Import puppeteer-core instead of puppeteer
import  dotenv  from 'dotenv'
const routes = express.Router();

routes.get('/events', async (req, res) => {
    const ingressoDigital = 'https://www.ingressodigital.com/list.php?busca=S&txt_busca=Vit%C3%B3ria&txt_busca_m=';

    // Specify the path to Chromium executable on the server
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--no-zygote",
        ],

        executablePath: process.env.NODE_ENV === 'production' 
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
        headless: true, // Or set it to false for debugging
    });

    const page = await browser.newPage();

    await page.goto(ingressoDigital);

    const textContents = await page.$$eval('.col-6', divs => {
        return divs.map(div => div.textContent?.trim());
    });

    await browser.close();

    return res.json({ textContents });
});

export default routes;